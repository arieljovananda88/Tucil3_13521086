
import 'parser.js'

class UCS extends Graph{
    constructor(){
        super(graph)
    }

    searchPath(start, goal){
        let visited = {}
        let activePaths = {}
        let endPath = {}
        let currNode = start
        let nextNode = goal
        console.log("start UCS search...")
        visited[currNode] = {
            node: start,
            isVisited: true
        }
        visited[nextNode] = false
        activePaths[currNode] = {
            cost: 0,
            path: [currNode]
        }
        console.log(visited)
       /*while (Object.keys(activePaths).length > 0){
            let lowestCost = Infinity
            let lowestCostNode = null
            for()
        }*/





    }

}

const graph = new Graph(graf.txt)
const ucs = new UCS()
ucs.searchPath()