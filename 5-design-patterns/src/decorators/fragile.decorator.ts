import {ShipmentDecorator} from './abstract-shipment.decorator';

export class FragileShipment extends ShipmentDecorator {
  public ship(): string {
    return `${this.shipment.ship()}\n**MARK FRAGILE**`;
  }

  public getShipmentID(): number {
    return this.shipment.getShipmentID();
  }
}
