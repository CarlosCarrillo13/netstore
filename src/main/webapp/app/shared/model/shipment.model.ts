import { ILocation } from 'app/shared/model/location.model';
import { DeliveryStatus } from 'app/shared/model/enumerations/delivery-status.model';

export interface IShipment {
  id?: number;
  shipDate?: string;
  estimatedArrivalDate?: string;
  deliveryStatus?: DeliveryStatus;
  trackingNumber?: string;
  shippingCompany?: string;
  shipmentAddress?: ILocation;
}

export class Shipment implements IShipment {
  constructor(
    public id?: number,
    public shipDate?: string,
    public estimatedArrivalDate?: string,
    public deliveryStatus?: DeliveryStatus,
    public trackingNumber?: string,
    public shippingCompany?: string,
    public shipmentAddress?: ILocation
  ) {}
}
