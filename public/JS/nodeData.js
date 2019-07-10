
let graph = {"nodes":["byPass","Policing","Drop","Misorder","Lattency","Shaping","Duplicate","Corruption"],
  "links":[{"source":1,"target":3},{"source":3,"target":4},{"source":4,"target":5},{"source":5,"target":6},{"source":6,"target":7},{"source":7,"target":8},{"source":8,"target":9}]};
let nodeIndex = graph.nodes.slice();
graph.nodes = graph.nodes.map(function (d){
  return { name: d };
});
graph.links = graph.links.map(function (d){
  d.source = graph.nodes[d.source];
  d.target = graph.nodes[d.target];
  return d
});

export {graph}
export {nodeIndex}