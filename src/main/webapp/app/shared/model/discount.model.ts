import { IItem } from 'app/shared/model/item.model';

export interface IDiscount {
  id?: number;
  percentage?: number;
  concept?: string;
  startDate?: string;
  endDate?: string;
  active?: boolean;
  item?: IItem;
}

export class Discount implements IDiscount {
  constructor(
    public id?: number,
    public percentage?: number,
    public concept?: string,
    public startDate?: string,
    public endDate?: string,
    public active?: boolean,
    public item?: IItem
  ) {
    this.active = this.active || false;
  }
}
