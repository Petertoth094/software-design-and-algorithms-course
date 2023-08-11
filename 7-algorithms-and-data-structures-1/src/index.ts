import {Dijkstra} from './dijkstra';
import {Edge} from './edge';
import {Vertex} from './vertex';
import {WeightedGraph} from './weighted-graph';

const vertices = [
  new Vertex('1'),
  new Vertex('2'),
  new Vertex('3'),
  new Vertex('4'),
  new Vertex('5'),
];

const vertex1 = vertices[0];
const vertex2 = vertices[1];
const vertex3 = vertices[2];
const vertex4 = vertices[3];
const vertex5 = vertices[4];

const edges = [
  new Edge(vertex1, vertex4, 3),
  new Edge(vertex1, vertex2, 5),
  new Edge(vertex1, vertex3, 4),
  new Edge(vertex2, vertex4, 6),
  new Edge(vertex2, vertex3, 5),
];

const graph: WeightedGraph = new WeightedGraph();
const dijkstra = new Dijkstra(graph);

vertices.forEach((vertice) => graph.addVertex(vertice.key));
edges.forEach((edge) => graph.addEdge(edge.from, edge.to, edge.weight));

console.log(dijkstra.findShortestPath(vertex4, vertex3)); // { path: ['4', '1', '3'], distance: 7 }
console.log(dijkstra.findShortestPath(vertex1, vertex5)); // { path: [], distance: null }
console.log(dijkstra.findShortestPath(vertex1, vertex1)); // { path: ['1'], distance: 0 }

dijkstra.findAllShortestPaths(vertex4);
// /*
//  {
//    '1': { path: ['4', '1'], distance: 3 },
//    '2': { path: ['4', '2'], distance: 6 },
//    '3': { path: ['4', '1', '3'], distance: 7 },
//    '5': { path: [], distance: null }
//  }
// */
