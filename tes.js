// define the data as a 2D array
// const fs = require('fs');

// // read the input text file
// const input = fs.readFileSync('graf1.txt', 'utf-8');

// // split the input by new line character and remove any leading/trailing white spaces
// const inputLines = input.split('\n').map(line => line.trim());
// const amountOfCoor = parseInt(inputLines[0]);
// console.log(inputLines.length)


// // parse the node coordinates
// const nodeCoordinates = {};
// for (let i = 1; i < amountOfCoor + 1; i++) {
//   if(i == 0){
//     continue
//   }
//   else{
//     const [node, x, y] = inputLines[i].split(' ');
//     nodeCoordinates[node] = {x: parseInt(x), y: parseInt(y)};
//   }
// }
// const matrixLine = 2 + amountOfCoor
// const columnLabels = inputLines[matrixLine].split(' ');
// const rowLabels = inputLines.slice(matrixLine+1).map(line => line.split(' ')[0]);
// const graph = {};
// const matrix = input
//         .split('\n')
//         .slice(matrixLine+1)
//         .map(row => row.trim().split(/\s+/).slice(1).map(num => String(num)))
// console.log(matrix)
// columnLabels.forEach(vertex => graph[vertex] = {});
// const vertices = rowLabels
// const vertices2 = columnLabels

// // add the edges to the graph
// for (let i = 0; i < rowLabels.length; i++) {
//   const sourceNode = rowLabels[i];
//   for (let j = 0; j < columnLabels.length; j++) { // Change to < instead of <=
//     const road = matrix[i][j].toString();
//     if (road != "0") { // Change to "0" instead of 0
//       const targetNode = columnLabels[j];
//       // add the target node to the graph object if it doesn't exist yet
//       if (!graph[targetNode]) {
//         graph[targetNode] = {};
//       }
//       graph[sourceNode][targetNode] = road;
//     }
//   }
// }

// console.log(nodeCoordinates); // print node coordinates object
// console.log(graph); // print graph object

function UCS(start, goal, graph, vertices, nodeCoor){
  let visited = {}
  let activePaths = {}
  let endPath = {}
  let pathKe = 0;
  let startNode = 0
  let currNode = start
  console.log("start UCS search...")
  console.log(start, goal)
  console.log(start === goal)
  if(start === goal){
    console.log("masuk")
    endPath[0] = {
        path: [start],
        dist: 0,
        road: []
    }   
  }
  activePaths[startNode] = {
      edgeNode: start,
      dist: 0,
      path: [start],
      road: []
  }
  console.log(graph, vertices, nodeCoor)
  console.log(activePaths[startNode].edgeNode)
  //console.log(currNode)
  console.log(Object.keys(visited).length, vertices.length)
  while (!(Object.keys(visited).length === vertices.length - 1)){
      let lowestDist = Infinity
      let lowestDistNode = null
      let currPathKe = null
      for(let node in activePaths ){
          if(!visited[activePaths[node].edgeNode]){
              let pathDist = activePaths[node].dist;
              if (pathDist < lowestDist) {
                  lowestDist = pathDist;
                  lowestDistNode = activePaths[node].edgeNode;
                  currPathKe = node;
              }
          }
      }                    
      currNode = lowestDistNode
      if(currNode === null){
        break
      }
      //console.log(currNode)
      //console.log("current node = ", currNode)
      //console.log(visited[currNode])
      //console.log(cu)
      console.log("currnode = ", currNode)
      let currPath = activePaths[currPathKe].path
      let currDist = activePaths[currPathKe].dist
      let currRoad = activePaths[currPathKe].road
      for(let branchNode in graph[currNode]){
        console.log("branch node = ", branchNode)
          if(!visited[branchNode] === true && branchNode != goal && branchNode != currNode){
            const x1 = nodeCoor[currNode].x;
            const y1 = nodeCoor[currNode].y;
            const x2 = nodeCoor[branchNode].x;
            const y2 = nodeCoor[branchNode].y;
            const dx = x2 - x1;
            const dy = y2 - y1;
            const result =  Math.sqrt(dx*dx + dy*dy);
            //let edgeWeight = graph[currNode][branchNode]
            let newDist = currDist + result
            let newPath = currPath.concat(branchNode)
            let newRoad = currRoad.concat(graph[currNode][branchNode])
            let i = 0
            // for (let node in activePaths) {
            //     i++
            //     console.log(`Path ${i}: [${activePaths[node].path}], cost: ${activePaths[node].dist}`);
            // }
            //console.log("branch node = ", branchNode)
            //console.log(newPath)
            //console.log("active paths to be added = ", activePaths[branchNode])
            pathKe++
            activePaths[pathKe] = {
                edgeNode: branchNode,
                dist: newDist,
                path: newPath,
                road: newRoad
            }
            //console.log("active paths that was added = ", activePaths[pathKe])
          }
          if(branchNode == goal){
            const x1 = nodeCoor[currNode].x;
            const y1 = nodeCoor[currNode].y;
            const x2 = nodeCoor[branchNode].x;
            const y2 = nodeCoor[branchNode].y;
            const dx = x2 - x1;
            const dy = y2 - y1;
            const result =  Math.sqrt(dx*dx + dy*dy);
            //let edgeWeight = graph[currNode][branchNode]
            let newDist = currDist + result
            let newPath = currPath.concat(branchNode)
            let newRoad = currRoad.concat(graph[currNode][branchNode])
            pathKe++
            endPath[pathKe] = { 
                dist: newDist,
                path: newPath,
                road: newRoad
            }
          }
      }
      visited[currNode] = true
      delete activePaths[currPathKe]
      let i = 0
      for (let node in activePaths) {
          i++
          console.log(`Path ${i}: [${activePaths[node].path}], cost: ${activePaths[node].dist}`);
      }
      lowestCost = Infinity
      lowestCostNode = null
      currPathKe = 0;
      console.log("end paths = ", endPath)
      /*console.log("visited before = ", visited)
      console.log("end paths = ", endPath)
      console.log("visited length = ", Object.keys(visited).length)
      console.log("akhir")*/
  }
  console.log("end paths = ", endPath)
  let [minPath, minDist] = Object.entries(endPath).reduce((acc, [path, {dist}]) => {
      if (dist < acc[1]) {
          return [path, dist];
      }
      return acc;
  }, ['', Infinity]);
  console.log(`Minimal dist path: ${minPath}, dist: ${minDist}`);
  console.log(endPath[minPath])
  return endPath[minPath];
                    
}

function AStar(start, goal, graph, vertices, nodeCoor){
  
  let visited = {}
  let activePaths = {}
  let endPath = {}
  let pathKe = 0;
  let startNode = 0
  let currNode = start
  console.log("start A* search...")
  if(start == goal){
    endPath[0] = {
        heuristik: 0,
        aStar: 0,
        path: [start],
        dist: 0,
        road: []
    }
      
  }
  activePaths[startNode] = {
      edgeNode: start,
      aStar: 0, //A star score
      dist: 0,
      heuristik: 0,
      path: [start],
      road: []
  }
  // console.log(activePaths[startNode].edgeNode)
  // console.log(currNode)
  // console.log(Object.keys(visited).length, vertices.length)
  while (!(Object.keys(visited).length === vertices.length - 1)){
    let LowestAStar = Infinity
    let LowestAStarNode = null
    let currPathKe = null
    for(let node in activePaths ){
        if(!visited[activePaths[node].edgeNode]){
          //console.log(activePaths[node].edgeNode)
            let pathAStar = activePaths[node].aStar;
            if (pathAStar < LowestAStar) {
                LowestAStar = pathAStar;
                LowestAStarNode = activePaths[node].edgeNode;
                currPathKe = node;
            }
        }
    }
    currNode = LowestAStarNode
    if(currNode === null){
      break
    }
    //console.log("current node = ", currNode)
    let currPath = activePaths[currPathKe].path
    let currDist = activePaths[currPathKe].dist
    let currHeu = activePaths[currPathKe].heuristik
    let currRoad = activePaths[currPathKe].road
    for(let branchNode in graph[currNode]){
        if(!visited[branchNode] === true && branchNode != goal && branchNode != currNode){
          const x1 = nodeCoor[currNode].x;
          const y1 = nodeCoor[currNode].y;
          const x2 = nodeCoor[branchNode].x;
          const y2 = nodeCoor[branchNode].y;
          const x3 = nodeCoor[goal].x
          const y3 = nodeCoor[goal].y
          const dx = x2 - x1;
          const dy = y2 - y1;
          const dx1 = x3 - x2
          const dy1 = y3 - y2
          const distCurrBr =  Math.sqrt(dx*dx + dy*dy);
          const distBrGoal = Math.sqrt(dx1*dx1 + dy1*dy1)
          //let edgeWeight = graph[currNode][branchNode]
          let newHeu = distBrGoal
          let newDist = currDist + distCurrBr
          let newAStar = currDist + distCurrBr + newHeu
          let newPath = currPath.concat(branchNode)
          let newRoad = currRoad.concat(graph[currNode][branchNode])
          let i = 0
          /*for (let node in activePaths) {
              i++
              console.log(`Path ${i}: [${activePaths[node].path}], cost: ${activePaths[node].dist}`);
          }
          console.log("branch node = ", branchNode)
          console.log(newPath)*/
          //console.log("active paths to be added = ", activePaths[branchNode])
          pathKe++
          activePaths[pathKe] = {
              edgeNode: branchNode,
              heuristik: newHeu,
              dist: newDist,
              aStar: newAStar,
              path: newPath,
              road: newRoad
          }
          //console.log("active paths that was added = ", activePaths[pathKe])
        }
        if(branchNode == goal){
          const x1 = nodeCoor[currNode].x;
          const y1 = nodeCoor[currNode].y;
          const x2 = nodeCoor[branchNode].x;
          const y2 = nodeCoor[branchNode].y;
          const x3 = nodeCoor[goal].x
          const y3 = nodeCoor[goal].y
          const dx = x2 - x1;
          const dy = y2 - y1;
          const dx1 = x3 - x2
          const dy1 = y3 - y2
          const distCurrBr =  Math.sqrt(dx*dx + dy*dy);
          const distBrGoal = Math.sqrt(dx1*dx1 + dy1*dy1)
          //let edgeWeight = graph[currNode][branchNode]
          let newHeu = distBrGoal
          let newDist = currDist + distCurrBr
          let newAStar = currDist + distCurrBr + newHeu
          let newPath = currPath.concat(branchNode)
          let newRoad = currRoad.concat(graph[currNode][branchNode])
          pathKe++
          endPath[pathKe] = { 
              heuristik: newHeu,
              aStar: newAStar,
              path: newPath,
              dist: newDist,
              road: newRoad
          }
        }
    }                
    
    visited[currNode] = true
    delete activePaths[currPathKe]
    /*for (let node in activePaths) {
        i++
        console.log(`Path ${i}: [${activePaths[node].path}], A Star Value: ${activePaths[node].aStar}, heu: ${activePaths[node].heuristik}`);
    }*/
    lowestCost = Infinity
    lowestCostNode = null
    currPathKe = 0;
  //console.log("visited before = ", visited)
  //console.log("visited length = ", Object.keys(visited).length)
  //console.log("akhir")
  }
  console.log("end paths = ", endPath)
  let [minPath, minDist] = Object.entries(endPath).reduce((acc, [path, {dist}]) => {
      if (dist < acc[1]) {
          return [path, dist];
      }
      return acc;
  }, ['', Infinity]);
  console.log(`Minimal dist path: ${minPath}, dist: ${minDist}`);
  console.log(endPath)
  return endPath[minPath];
}


// console.log(nodeCoordinates)
// AStar("F", "A", graph, vertices, vertices2, nodeCoordinates)
// UCS("G", "F", graph, vertices, nodeCoordinates)
// console.log(nodeCoordinates["bandung"].x)
// console.log(graph["A"]["B"])
//console.log(nodeCoordinates["A"].x)
