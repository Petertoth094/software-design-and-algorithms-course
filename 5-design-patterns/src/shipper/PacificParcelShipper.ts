import {ShippingStrategy} from './ShippingStrategyFactory';
import {ShipmentType, ShipmentTypes} from './shipper';

export class PacificParcelShipper implements ShippingStrategy {
  private static pacificParcelShipper: PacificParcelShipper;
  private static costByType: {[key in ShipmentType]: Function} = {
    [ShipmentTypes.letter]: (weight: number) => weight * 0.51,
    [ShipmentTypes.package]: (weight: number) => weight * 0.19,
    [ShipmentTypes.oversized]: (weight: number) =>
      PacificParcelShipper.costByType[ShipmentTypes.package](weight) +
      weight * 0.02,
  };

  private constructor() {}

  public static getInstance(): PacificParcelShipper {
    if (!PacificParcelShipper.pacificParcelShipper) {
      PacificParcelShipper.pacificParcelShipper = new PacificParcelShipper();
    }

    return PacificParcelShipper.pacificParcelShipper;
  }

  public getCost(type: ShipmentType, weight: number): number {
    return PacificParcelShipper.costByType[type](weight);
  }
}
