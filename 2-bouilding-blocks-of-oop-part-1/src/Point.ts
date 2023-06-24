export class Point {
  private x: number;
  private y: number;

  constructor();
  constructor(x: number, y: number);

  // constructor(...args: any[]) {
  // constructor(x?: number, y?: number) {
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }

  distance(): number;
  distance(other: Point): number;
  distance(x: number, y: number): number;
  // distance(...args: any[]): number {
  distance(x?: Point | number, y?: number): number {
    if (typeof x === "number" && typeof y === "number") {
      return Math.hypot(x - this.x, y - this.y);
    }

    if (typeof x === "object") {
      return Math.hypot(x.x - this.x, x.y - this.y);
    }

    return Math.hypot(this.x, this.y);
  }
}
