// define the data as a 2D array
const data = [
    [0, 1, 0, 1, 0],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 1, 0],
    [1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0],
  ];
  
  // create an array of nodes
  const nodes = [];
  for (let i = 0; i < data.length; i++) {
    nodes.push({ id: i + 1, label: String.fromCharCode(65 + i) });
  }
  
  // create an array of edges
  const edges = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === 1) {
        edges.push({ from: i + 1, to: j + 1 });
      }
    }
  }
  
  // create a network graph
  const container = document.getElementById('mynetwork');
  const options = {};
  const network = new vis.Network(container, { nodes, edges }, options);
  