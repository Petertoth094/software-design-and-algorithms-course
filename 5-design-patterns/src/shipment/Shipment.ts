import {ShipmentMark} from '../decorators/shipment-decorators';
import {IShipper} from '../shipper/shipper';

export interface IShipment {
  getShipmentID(): number;
  ship(): string;
}

export interface ShipmentData {
  shipmentId: number;
  weight: number;
  fromAddress: string;
  fromZipCode: string;
  toAddress: string;
  toZipCode: string;
  marks: ShipmentMark[];
}

export class Shipment implements IShipment {
  constructor(private shipmentId: number, private shipper: IShipper) {}

  getShipmentID(): number {
    return this.shipmentId;
  }

  ship(): string {
    return this.shipper.ship();
  }
}
