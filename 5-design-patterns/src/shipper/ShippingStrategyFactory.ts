import {AirEastShipper} from './AirEastShipper';
import {ChicagoSprintShipper} from './ChicagoSpringShipper';
import {PacificParcelShipper} from './PacificParcelShipper';
import {ShipmentType} from './shipper';

export interface ShippingStrategy {
  getCost(type: ShipmentType, weight: number): number;
}

const SHIPPING_MAP = {
  1: AirEastShipper,
  2: AirEastShipper,
  3: AirEastShipper,
  4: ChicagoSprintShipper,
  5: ChicagoSprintShipper,
  6: ChicagoSprintShipper,
  7: PacificParcelShipper,
  8: PacificParcelShipper,
  9: PacificParcelShipper,
};

export class ShippingStrategyFactory {
  private static shippingStrategyFactory: ShippingStrategyFactory;

  private constructor() {}

  public static getInstance(): ShippingStrategyFactory {
    if (!ShippingStrategyFactory.shippingStrategyFactory) {
      ShippingStrategyFactory.shippingStrategyFactory =
        new ShippingStrategyFactory();
    }

    return ShippingStrategyFactory.shippingStrategyFactory;
  }

  public createShippingStrategy(fromZipCode: string): ShippingStrategy {
    const shippingStrategy = SHIPPING_MAP[fromZipCode[0]] ?? AirEastShipper;

    return shippingStrategy.getInstance();
  }
}
