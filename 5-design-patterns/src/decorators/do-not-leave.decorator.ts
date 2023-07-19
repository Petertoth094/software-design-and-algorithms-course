import {ShipmentDecorator} from './abstract-shipment.decorator';

export class DoNotLeaveShipment extends ShipmentDecorator {
  public ship() {
    return `${this.shipment.ship()}\n**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**`;
  }

  public getShipmentID(): number {
    return this.shipment.getShipmentID();
  }
}
