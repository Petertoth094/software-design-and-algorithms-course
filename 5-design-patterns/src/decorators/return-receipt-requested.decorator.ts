import {ShipmentDecorator} from './abstract-shipment.decorator';

export class ReturnReceiptRequestedShipment extends ShipmentDecorator {
  public ship() {
    return `${this.shipment.ship()}\n**MARK RETURN RECEIPT REQUESTED**`;
  }

  public getShipmentID(): number {
    return this.shipment.getShipmentID();
  }
}
