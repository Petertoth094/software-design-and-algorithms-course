import {Vertex} from './vertex';

// could be generic
export class Edge {
  constructor(public from: Vertex, public to: Vertex, public weight: number) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}
