import {Edge} from './edge';
import {Vertex} from './vertex';

interface IWeightedGraph<T> {
  addVertex(key: string): void;
  addEdge(vertex1: T, vertex2: T, weight: number): void;
}

//TODO use MAP and Set
export class WeightedGraph implements IWeightedGraph<Vertex> {
  public vertices: string[];
  public adjacencyList: Record<string, {node: string; weight: number}[]>;

  constructor() {
    this.vertices = [];
    this.adjacencyList = {};
  }

  addVertex(key: string): void {
    this.vertices.push(key);
    if (!this.adjacencyList[key]) this.adjacencyList[key] = [];
  }

  //TODO check if error handling is correct
  addEdge(vertex1: Vertex, vertex2: Vertex, weight: number): void {
    if (
      !(
        this.vertices.includes(vertex1.key) &&
        this.vertices.includes(vertex2.key)
      )
    ) {
      throw new Error('Graph does not contain vertex1 or vertex2');
    }
    this.adjacencyList[vertex1.key].push({node: vertex2.key, weight});
    this.adjacencyList[vertex2.key].push({node: vertex1.key, weight});
  }
}
