import {
  ShipmentMark,
  SHIPMENT_DECORATORS,
} from '../decorators/shipment-decorators';
import {RawShipmentData} from '../mocks/shipment-data.mock';
import {IShipper, Shipper} from '../shipper/shipper';
import {Shipment} from './Shipment';
export class ShipmentBuilder {
  private static id = 0;
  constructor() {}

  public getShipment({
    fromZipCode,
    weight,
    marks,
    fromAddress,
    toZipCode,
    toAddress,
  }: RawShipmentData): Shipment {
    const shipmentId = this.getUniqueId();
    const shipper: IShipper = new Shipper(
      shipmentId,
      fromZipCode,
      fromAddress,
      toZipCode,
      toAddress,
      weight
    );

    return this.markShipment(marks, new Shipment(shipmentId, shipper));
  }

  private markShipment(marks: ShipmentMark[], shipment: Shipment): Shipment {
    return marks.reduce(
      (shipment: Shipment, mark: ShipmentMark) =>
        new SHIPMENT_DECORATORS[mark](shipment),
      shipment
    );
  }

  private getUniqueId() {
    return ShipmentBuilder.id++;
  }
}
