function UCS(start, goal, graph, vertices, nodeCoor){
  let visited = {}
  let activePaths = {}
  let endPath = {}
  let pathKe = 0;
  let startNode = 0
  let currNode = start
  console.log("start UCS search...")
  if(start === goal){
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
      let currPath = activePaths[currPathKe].path
      let currDist = activePaths[currPathKe].dist
      let currRoad = activePaths[currPathKe].road
      for(let branchNode in graph[currNode]){
          const x1 = nodeCoor[currNode].x;
          const y1 = nodeCoor[currNode].y;
          const x2 = nodeCoor[branchNode].x;
          const y2 = nodeCoor[branchNode].y;
          const dx = x2 - x1;
          const dy = y2 - y1;
          const result =  Math.sqrt(dx*dx + dy*dy);
          let newDist = currDist + result
          let newPath = currPath.concat(branchNode)
          let newRoad = currRoad.concat(graph[currNode][branchNode])
          if(!visited[branchNode] === true && branchNode != goal && branchNode != currNode){
            pathKe++
            activePaths[pathKe] = {
                edgeNode: branchNode,
                dist: newDist,
                path: newPath,
                road: newRoad
            }
          }
          if(branchNode == goal){
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
  }
  let [minPath, minDist] = Object.entries(endPath).reduce((acc, [path, {dist}]) => {
      if (dist < acc[1]) {
          return [path, dist];
      }
      return acc;
  }, ['', Infinity]);
  return endPath[minPath];
                    
}