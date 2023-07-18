import { Comparable } from "./Comparable";

export abstract class Item implements Comparable<Item> {
  static idCounter: number = 0;
  static resetIdCounter(): void {
    this.idCounter = 0;
  }

  readonly name: string;
  value: number;
  weight: number;
  private readonly id: number;

  constructor(name: string, value: number, weight: number) {
    this.name = name;
    this.value = value;
    this.weight = weight;

    this.id = ++Item.idCounter;
  }

  use(): void {}

  compareTo(other: Item): number {
    const valueComparison = this.value - other.value;

    if (valueComparison !== 0) {
      return valueComparison > 0 ? 1 : -1;
    }
    return this.name.localeCompare(other.name);
  }

  toString(): string {
    const formattedValue = this.value.toFixed(2);
    const formattedWeight = this.weight.toFixed(2);
    return `${this.name} − Value: ${formattedValue}, Weight: ${formattedWeight}`;
  }

  getId(): number {
    return this.id;
  }
}
