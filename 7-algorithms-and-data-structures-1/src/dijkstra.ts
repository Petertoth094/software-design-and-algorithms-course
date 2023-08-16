import {Queue} from './queue';
import {Vertex} from './vertex';
import {WeightedGraph} from './weighted-graph';

interface Path {
  path: string[];
  distance: number;
}

interface IDijkstra<T> {
  findShortestPath(vertex1: T, vertex2: T): Path;
  findAllShortestPaths(vertex: T): Record<string, Path>;
}

export class Dijkstra implements IDijkstra<Vertex> {
  constructor(private graph: WeightedGraph) {
    this.graph = graph;
  }

  public findShortestPath(vertex1: Vertex, vertex2: Vertex): Path {
    let distances: Record<string, number> = {};
    let backtrace: Record<string, string> = {};
    let priorityQueue = new Queue<string>();

    distances[vertex1.key] = 0;

    this.graph.vertices.forEach((node) => {
      if (node !== vertex1.key) {
        distances[node] = Infinity;
      }
    });

    priorityQueue.enqueue([vertex1.key, 0]);

    while (!priorityQueue.isEmpty()) {
      let shortestStep = priorityQueue.dequeue();
      let currentNode = shortestStep?.[0] || '';
      this.graph.adjacencyList[currentNode].forEach((current) => {
        let distance = distances[currentNode] + current.weight;
        if (distance < distances[current.node]) {
          distances[current.node] = distance;
          backtrace[current.node] = currentNode;
          priorityQueue.enqueue([current.node, distance]);
        }
      });
    }

    let lastStep = vertex2.key;
    const isFinite = Number.isFinite(distances[vertex2.key]);
    let path = isFinite ? [vertex2.key] : [];

    while (lastStep !== vertex1.key && lastStep in backtrace) {
      path.unshift(backtrace[lastStep]);
      lastStep = backtrace[lastStep];
    }

    return {path, distance: distances[vertex2.key]};
  }

  public findAllShortestPaths(vertex: Vertex): Record<string, Path> {
    const nodes = Object.keys(this.graph.adjacencyList).filter(
      (key: string) => key !== vertex.key
    );

    const paths: Record<string, Path> = {};
    for (let node of nodes) {
      paths[node] = this.findShortestPath(vertex, new Vertex(node));
    }

    return paths;
  }
}
