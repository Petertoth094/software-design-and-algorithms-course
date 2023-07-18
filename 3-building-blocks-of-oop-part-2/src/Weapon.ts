import { Item } from "./Item";

export abstract class Weapon extends Item {
  static readonly MODIFIER_CHANGE_RATE: number = 0.05;

  protected baseDamage: number;
  protected damageModifier: number = 0;
  private baseDurability: number;
  protected durabilityModifier: number = 0;

  protected effectiveDurability: number;
  protected broken: boolean = false;

  constructor(name: string, baseDamage: number, baseDurability: number, value: number, weight: number) {
    super(name, value, weight);
    this.baseDamage = baseDamage;
    this.baseDurability = baseDurability;
    this.effectiveDurability = this.getEffectiveDurability();
  }

  getEffectiveDamage(): number {
    return this.baseDamage + this.damageModifier;
  }

  getEffectiveDurability();
  getEffectiveDurability(durabilityModifier: number);
  getEffectiveDurability(durabilityModifier: number = this.durabilityModifier): number {
    return this.baseDurability + durabilityModifier;
  }

  toString(): string {
    const formattedValue = this.value.toFixed(2);
    const formattedWeight = this.weight.toFixed(2);
    const formattedDamage = this.getEffectiveDamage().toFixed(2);
    const formattedDurability = (this.effectiveDurability * 100).toFixed(2);

    return `${this.name} − Value: ${formattedValue}, Weight: ${formattedWeight}, Damage: ${formattedDamage}, Durability: ${formattedDurability}%`;
  }

  use(): string {
    if (this.broken) {
      return `You can't use the ${this.name}, it is broken.`;
    }

    this.effectiveDurability -= Weapon.MODIFIER_CHANGE_RATE;

    if (this.effectiveDurability <= 0) {
      this.effectiveDurability = 0;
      this.broken = true;
      return `You use the ${this.name}, dealing ${Weapon.MODIFIER_CHANGE_RATE} points of damage.\nThe ${this.name} breaks.`;
    }

    return `You use the ${this.name}, dealing ${Weapon.MODIFIER_CHANGE_RATE} points of damage.`;
  }

  polish(): void {}
}
