import {ShippingStrategyFactory} from './ShippingStrategyFactory';

export interface IShipper {
  ship(): string;
}

export const ShipmentTypes = {
  letter: 'LETTER',
  package: 'PACKAGE',
  oversized: 'OVERSIZED',
};

export type ShipmentType = (typeof ShipmentTypes)[keyof typeof ShipmentTypes];

export class Shipper implements IShipper {
  private cost: number;
  private shippingStrategyFactory = ShippingStrategyFactory.getInstance();

  constructor(
    private shipmentId: number,
    private fromZipCode: string,
    private fromAddress: string,
    private toZipCode: string,
    private toAddress: string,
    private weight: number
  ) {
    const shippingStrategy =
      this.shippingStrategyFactory.createShippingStrategy(fromZipCode);
    const shipmentType = this.getShipmentType(this.weight);
    this.cost = shippingStrategy.getCost(shipmentType, this.weight);
  }

  ship(): string {
    return `Shipment with the ID ${this.shipmentId} will be picked up from ${
      this.fromZipCode
    } ${this.fromAddress} and shipped to ${this.toZipCode} ${
      this.toAddress
    } Cost = ${this.cost.toFixed(1)}`;
  }

  private getShipmentType(weight: number): ShipmentType {
    if (weight <= 15) {
      return ShipmentTypes.letter;
    }

    if (weight <= 160) {
      return ShipmentTypes.package;
    }

    return ShipmentTypes.oversized;
  }
}
