import { Weapon } from "./Weapon";

export class Bow extends Weapon {
  constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
    super("bow", baseDamage, baseDurability, value, weight);
  }

  polish(): void {
    const newDurabilityModifier = this.durabilityModifier + Weapon.MODIFIER_CHANGE_RATE;
    const difference = this.getEffectiveDurability(newDurabilityModifier) - 1;

    this.durabilityModifier = difference > 0 ? newDurabilityModifier - difference : newDurabilityModifier;
    this.effectiveDurability = this.getEffectiveDurability(this.durabilityModifier);
  }
}
