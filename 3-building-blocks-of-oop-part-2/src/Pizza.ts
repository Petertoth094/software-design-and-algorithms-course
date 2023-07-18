import { Consumable } from "./Consumable";

export class Pizza extends Consumable {
  readonly numberOfSlices: number;
  private numberOFEatenSlices: number;

  constructor(value: number, weight: number, numberOfSlices: number, isSpoiled: boolean = false) {
    super("pizza", value, weight, isSpoiled);
    this.numberOfSlices = numberOfSlices;
    this.numberOFEatenSlices = 0;
  }

  getNumberOfEatenSlices(): number {
    return this.numberOFEatenSlices;
  }

  eat(): string {
    if (this.getNumberOfEatenSlices() === this.numberOfSlices) {
      this.isConsumed = true;
      return this.use();
    }

    ++this.numberOFEatenSlices;
    return `You consumed a slice of the pizza.`;
  }
}
