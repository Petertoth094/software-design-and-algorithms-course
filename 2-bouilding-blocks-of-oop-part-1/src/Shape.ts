import { Point } from "./Point";

export abstract class Shape {
  private points: Point[];
  protected color: string;
  protected filled: boolean;

  constructor(points: Point[]);
  constructor(points: Point[], color: string, filled: boolean);

  // constructor(points: Point[], color?: string, filled?: boolean) {
  constructor(points: Point[], color: string = "green", filled: boolean = true) {
    if (points.length <= 2) {
      throw new Error("A shape must have at least 3 points");
    }

    this.points = points;
    this.color = color;
    this.filled = filled;
  }

  abstract getType(): string;

  toString(): string {
    return `A Shape with color of ${this.color} and ${
      this.filled ? "filled" : "not filled"
    }. Points: ${this.points.join(", ")}.`;
  }

  getPerimeter(): number {
    return this.points.reduce((sum, currentPoint, index, points) => {
      if (index === this.points.length) {
        return (sum += currentPoint.distance(points[0]));
      }
      return (sum += currentPoint.distance(points[index + 1]));
    }, 0);
  }
}
