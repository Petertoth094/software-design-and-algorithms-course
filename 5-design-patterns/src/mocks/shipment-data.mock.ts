import {ShipmentMarks} from '../decorators/shipment-decorators';
import {ShipmentData} from '../shipment/Shipment';

export type RawShipmentData = Omit<ShipmentData, 'shipmentId'>;

export const SHIPMENT_MOCK_DATA: RawShipmentData[] = [
  {
    weight: 10,
    fromAddress: 'Budapest',
    fromZipCode: '1001',
    toAddress: 'Debrecen',
    toZipCode: '4030',
    marks: [
      ShipmentMarks.doNotLeave,
      ShipmentMarks.fragile,
      ShipmentMarks.returnReceiptRequested,
    ],
  },
  {
    weight: 100,
    fromAddress: 'Szeged',
    fromZipCode: '2001',
    toAddress: 'Szolnok',
    toZipCode: '5000',
    marks: [ShipmentMarks.doNotLeave, ShipmentMarks.fragile],
  },
  {
    weight: 1000,
    fromAddress: 'Hegyalja',
    fromZipCode: '6001',
    toAddress: 'Sopron',
    toZipCode: '7001',
    marks: [ShipmentMarks.doNotLeave],
  },
  {
    weight: 10000,
    fromAddress: 'Miskolc',
    fromZipCode: '3456',
    toAddress: 'Debrecen',
    toZipCode: '4031',
    marks: [],
  },
];
