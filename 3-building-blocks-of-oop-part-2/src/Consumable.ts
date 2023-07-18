import { Item } from "./Item";

export abstract class Consumable extends Item {
  isConsumed: boolean;
  private _isSpoiled: boolean;

  constructor(name: string, value: number, weight: number, isSpoiled: boolean = false) {
    super(name, value, weight);
    this._isSpoiled = isSpoiled;
    this.isConsumed = false;
  }

  eat(): string {
    this.isConsumed = true;
    return `You consumed the ${this.name}.`;
  }

  use(): string {
    if (this.isConsumed) {
      return `There's nothing left of the ${this.name} to consume.`;
    }

    if (this._isSpoiled) {
      return `${this.eat()}\nYou feel sick.`;
    }

    return this.eat();
  }

  isSpoiled(): boolean {
    return this._isSpoiled;
  }
}
