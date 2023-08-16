import {DoNotLeaveShipment} from './do-not-leave.decorator';
import {FragileShipment} from './fragile.decorator';
import {ReturnReceiptRequestedShipment} from './return-receipt-requested.decorator';

export const ShipmentMarks = {
  fragile: 'FRAGILE',
  doNotLeave: 'DO_NOT_LEAVE',
  returnReceiptRequested: 'RETURN_RECIPIENT_REQUESTED',
};

export type ShipmentMark = (typeof ShipmentMarks)[keyof typeof ShipmentMarks];

export const SHIPMENT_DECORATORS: {[key in ShipmentMark]: any} = {
  [ShipmentMarks.fragile]: FragileShipment,
  [ShipmentMarks.doNotLeave]: DoNotLeaveShipment,
  [ShipmentMarks.returnReceiptRequested]: ReturnReceiptRequestedShipment,
};
