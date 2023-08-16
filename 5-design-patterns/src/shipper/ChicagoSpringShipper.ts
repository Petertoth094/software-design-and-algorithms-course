import {ShippingStrategy} from './ShippingStrategyFactory';
import {ShipmentType, ShipmentTypes} from './shipper';

export class ChicagoSprintShipper implements ShippingStrategy {
  private static chicagoSprintShipper: ChicagoSprintShipper;
  private static costByType: {[key in ShipmentType]: Function} = {
    [ShipmentTypes.letter]: (weight: number) => weight * 0.42,
    [ShipmentTypes.package]: (weight: number) => weight * 0.2,
    [ShipmentTypes.oversized]: (_: number) => 0,
  };

  private constructor() {}

  public static getInstance(): ChicagoSprintShipper {
    if (!ChicagoSprintShipper.chicagoSprintShipper) {
      ChicagoSprintShipper.chicagoSprintShipper = new ChicagoSprintShipper();
    }

    return ChicagoSprintShipper.chicagoSprintShipper;
  }

  public getCost(type: ShipmentType, weight: number): number {
    return ChicagoSprintShipper.costByType[type](weight);
  }
}
