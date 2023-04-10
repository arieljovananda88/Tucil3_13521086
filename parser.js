const fs = require('fs');

class Graph{
    constructor(path){
        this.path = path
        this.graph = {}
        this.vertices = {}
        this.vertices2 = {}
    }

    parse(){
        const file = fs.readFileSync(this.path, 'utf-8').trim();
        const matrixFile = fs.readFileSync(this.path, 'utf-8');
        const rowLabels = matrixFile
        .split('\n')
        .slice(1) // Skip the first row which contains the column labels
        .map(row => row.trim().charAt(0)); // Extract the first character of each row
        const matrix = matrixFile
        .split('\n')
        .slice(1)
        .map(row => row.trim().split(/\s+/).slice(1).map(Number))
        .filter(row => row.length > 0);
        const rows = file.split('\n').slice(1);
        const columnLabels = file
        .split('\n')[0]
        .split(/\s+/)
        .slice(0);
        //console.log(columnLabels)
        //console.log(rowLabels)
        //graph = {};
        this.vertices = columnLabels
        this.vertices2 = rowLabels
        this.vertices.forEach(vertex => this.graph[vertex] = {});
        //console.log(this.graph)
        //console.log(matrix)
        for (let i = 0; i < this.vertices.length; i++) {
            for (let j = 0; j < this.vertices2.length; j++) {
              const weight = matrix[i][j];
              //console.log(weight)
              if (weight > 0) {
                this.graph[this.vertices[i]][this.vertices2[j]] = weight;
                //console.log(graph)
              }
            }
          } 
    }

    UCS(start, goal){
        let visited = {}
        let activePaths = {}
        let endPath = {}
        let pathKe = 0;
        let startNode = 0
        let currNode = start
        console.log("start UCS search...")
        activePaths[startNode] = {
            edgeNode: start,
            cost: 0,
            path: [start]
        }
        console.log(activePaths[startNode].edgeNode)
        console.log(Object.keys(visited).length, this.vertices.length)
        while (!(Object.keys(visited).length === this.vertices.length - 1)){
            let lowestCost = Infinity
            let lowestCostNode = null
            let currPathKe = null
            for(let node in activePaths ){
                if(!visited[activePaths[node].edgeNode]){
                    let pathCost = activePaths[node].cost;
                    if (pathCost < lowestCost) {
                        lowestCost = pathCost;
                        lowestCostNode = activePaths[node].edgeNode;
                        currPathKe = node;
                    }
                }
            }                    
            currNode = lowestCostNode
            console.log("current node = ", currNode)
            console.log(visited[currNode])
            //console.log(cu)
            let currPath = activePaths[currPathKe].path
            let currCost = activePaths[currPathKe].cost
            for(let branchNode in this.graph[currNode]){
                if(!visited[branchNode] === true && branchNode != goal && branchNode != currNode){
                    let edgeWeight = this.graph[currNode][branchNode]
                    let newCost = currCost + edgeWeight
                    let newPath = currPath.concat(branchNode)
                    let i = 0
                    /*for (let node in activePaths) {
                        i++
                        console.log(`Path ${i}: [${activePaths[node].path}], cost: ${activePaths[node].cost}`);
                    }*/
                    console.log("branch node = ", branchNode)
                    //console.log(newPath)
                    //console.log("active paths to be added = ", activePaths[branchNode])
                    pathKe++
                    activePaths[pathKe] = {
                        edgeNode: branchNode,
                        cost: newCost,
                        path: newPath
                    }
                    console.log("active paths that was added = ", activePaths[pathKe])
                }
                if(branchNode == goal){
                    let edgeWeight = this.graph[currNode][branchNode]
                    let newCost = currCost + edgeWeight
                    let newPath = currPath.concat(branchNode)
                    pathKe++
                    endPath[pathKe] = { 
                        cost: newCost,
                        path: newPath
                    }
                    
                }
            }
            //console.log("skip")
            //console.log(currNode)
            //console.log(activePaths[currNode])
            visited[currNode] = true
            delete activePaths[currPathKe]
            let i = 0
            for (let node in activePaths) {
                i++
                console.log(`Path ${i}: [${activePaths[node].path}], cost: ${activePaths[node].cost}`);
            }
            lowestCost = Infinity
            lowestCostNode = null
            currPathKe = 0;
            console.log("visited before = ", visited)
            console.log("end paths = ", endPath)
            console.log("visited length = ", Object.keys(visited).length)
            console.log("akhir")
        }
        let [minPath, minCost] = Object.entries(endPath).reduce((acc, [path, {cost}]) => {
            if (cost < acc[1]) {
                return [path, cost];
            }
            return acc;
        }, ['', Infinity]);
        console.log(`Minimal cost path: ${minPath}, cost: ${minCost}`);
        return 0;
            
            
     }

    
    print(){
        for (let i = 0; i < this.vertices.length; i++) {
            const vertex = this.vertices[i];
            console.log(`Node ${vertex}:`);
            const edges = this.graph[vertex];
            for (const [edge, weight] of Object.entries(edges)) {
                console.log(`- ${edge} (weight: ${weight})`);
            }
        }
    }

        
}



const graph = new Graph('graf.txt')
//const ucs = new UCS('graf.txt')
graph.parse()
graph.print()
//graph.UCS('A', 'H')
//ucs.print()