import {RawShipmentData} from '../mocks/shipment-data.mock';
import {Shipment} from '../shipment/Shipment';
import {ShipmentBuilder} from '../shipment/ShipmentBuilder';

export class ShippingClient {
  private static shippingClient: ShippingClient;
  private shipmentBuilder: ShipmentBuilder = new ShipmentBuilder();

  private constructor() {}

  public static getInstance(): ShippingClient {
    if (!ShippingClient.shippingClient) {
      ShippingClient.shippingClient = new ShippingClient();
    }

    return ShippingClient.shippingClient;
  }

  public displayShipment(rawShipmentData: RawShipmentData) {
    const shipment: Shipment =
      this.shipmentBuilder.getShipment(rawShipmentData);
    console.log(shipment.ship());
  }
}
