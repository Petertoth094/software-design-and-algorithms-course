import { Point } from "./Point";
import { Shape } from "./Shape";

export class Triangle extends Shape {
  protected triangle: Point[];

  constructor(pointA: Point, pointB: Point, pointC: Point);
  constructor(pointA: Point, pointB: Point, pointC: Point, color: string, filled: boolean);

  constructor(pointA: Point, pointB: Point, pointC: Point, color?: string, filled?: boolean) {
    super([pointA, pointB, pointC], color, filled);
    this.triangle = [pointA, pointB, pointC];
  }

  toString(): string {
    return `Triangle[v1=${this.triangle[0]},v2=${this.triangle[1]},v3=${this.triangle[2]}]`;
  }

  getType(): string {
    const verticeA = this.getVertice(this.triangle[0], this.triangle[1]);
    const verticeB = this.getVertice(this.triangle[1], this.triangle[2]);
    const verticeC = this.getVertice(this.triangle[2], this.triangle[0]);

    const isEquilateralTriangle = verticeA === verticeB && verticeB === verticeC;
    if (isEquilateralTriangle) {
      return "equilateral triangle";
    }

    const isIsoscelesTriangle = verticeA === verticeB || verticeA === verticeC || verticeB === verticeC;
    if (isIsoscelesTriangle) {
      return "isosceles triangle";
    }

    return "scalene triangle";
  }

  private getVertice(firstPoint: Point, secondPoint: Point): string {
    return firstPoint.distance(secondPoint).toFixed(2);
  }
}
