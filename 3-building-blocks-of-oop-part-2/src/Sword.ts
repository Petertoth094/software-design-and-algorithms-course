import { Weapon } from "./Weapon";

export class Sword extends Weapon {
  private static readonly MAX_DAMAGE_MODIFIER: number = 0.25;
  constructor(baseDamage: number, baseDurability: number, value: number, weight: number) {
    super("sword", baseDamage, baseDurability, value, weight);
  }

  polish(): void {
    if (this.damageModifier < Sword.MAX_DAMAGE_MODIFIER * this.baseDamage) {
      this.damageModifier += Weapon.MODIFIER_CHANGE_RATE;
      if (this.damageModifier > Sword.MAX_DAMAGE_MODIFIER * this.baseDamage) {
        this.damageModifier = Sword.MAX_DAMAGE_MODIFIER * this.baseDamage;
      }
    }
  }
}
