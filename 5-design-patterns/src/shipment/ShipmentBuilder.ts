import {
  ShipmentMark,
  SHIPMENT_DECORATORS,
} from '../decorators/shipment-decorators';
import {getUniqueId} from '../getUniqueId';
import {RawShipmentData} from '../mocks/shipment-data.mock';
import {IShipper, Shipper} from '../shipper/shipper';
import {Shipment} from './Shipment';
export class ShipmentBuilder {
  constructor() {}

  public getShipment({
    fromZipCode,
    weight,
    marks,
    fromAddress,
    toZipCode,
    toAddress,
  }: RawShipmentData): Shipment {
    const shipmentId = getUniqueId();
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
}
