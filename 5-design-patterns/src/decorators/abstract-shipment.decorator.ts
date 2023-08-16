import {IShipment} from '../shipment/Shipment';

export abstract class ShipmentDecorator implements IShipment {
  constructor(protected shipment: IShipment) {}

  public abstract ship(): string;

  public abstract getShipmentID(): number;
}
