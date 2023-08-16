import {ShippingStrategy} from './ShippingStrategyFactory';
import {ShipmentType, ShipmentTypes} from './shipper';

export class AirEastShipper implements ShippingStrategy {
  private static airEastShipper: AirEastShipper;
  private static costByType: {[key in ShipmentType]: Function} = {
    [ShipmentTypes.letter]: (weight: number) => weight * 0.39,
    [ShipmentTypes.package]: (weight: number) => weight * 0.25,
    [ShipmentTypes.oversized]: (weight: number) =>
      AirEastShipper.costByType[ShipmentTypes.package](weight) + 10,
  };

  private constructor() {}

  public static getInstance(): AirEastShipper {
    if (!AirEastShipper.airEastShipper) {
      AirEastShipper.airEastShipper = new AirEastShipper();
    }

    return AirEastShipper.airEastShipper;
  }

  public getCost(type: ShipmentType, weight: number): number {
    return AirEastShipper.costByType[type](weight);
  }
}
