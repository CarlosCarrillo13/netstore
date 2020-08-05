import { IEmployee } from 'app/shared/model/employee.model';
import { IShipment } from 'app/shared/model/shipment.model';
import { IItem } from 'app/shared/model/item.model';

export interface IInvoice {
  id?: number;
  totalPrize?: string;
  totalTax?: string;
  totalDiscount?: string;
  date?: string;
  recall?: boolean;
  invoiceVendor?: IEmployee;
  invoiceShipment?: IShipment;
  invoiceItems?: IItem[];
}

export class Invoice implements IInvoice {
  constructor(
    public id?: number,
    public totalPrize?: string,
    public totalTax?: string,
    public totalDiscount?: string,
    public date?: string,
    public recall?: boolean,
    public invoiceVendor?: IEmployee,
    public invoiceShipment?: IShipment,
    public invoiceItems?: IItem[]
  ) {
    this.recall = this.recall || false;
  }
}
