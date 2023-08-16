import {ShippingClient} from '../client/ShippingClient';
import {SHIPMENT_MOCK_DATA} from '../mocks/shipment-data.mock';

const shippingClient = ShippingClient.getInstance();

SHIPMENT_MOCK_DATA.forEach((shipmentData) => {
  shippingClient.displayShipment(shipmentData);
});
