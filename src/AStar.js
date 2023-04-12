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
    while (!(Object.keys(visited).length === vertices.length - 1)){
      let LowestAStar = Infinity
      let LowestAStarNode = null
      let currPathKe = null
      for(let node in activePaths ){
          if(!visited[activePaths[node].edgeNode]){
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
      let currPath = activePaths[currPathKe].path
      let currDist = activePaths[currPathKe].dist
      let currRoad = activePaths[currPathKe].road
      for(let branchNode in graph[currNode]){
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
          if(!visited[branchNode] === true && branchNode != goal && branchNode != currNode){
            pathKe++
            activePaths[pathKe] = {
                edgeNode: branchNode,
                heuristik: newHeu,
                dist: newDist,
                aStar: newAStar,
                path: newPath,
                road: newRoad
            }
          }
          if(branchNode == goal){
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
      lowestCost = Infinity
      lowestCostNode = null
      currPathKe = 0;
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