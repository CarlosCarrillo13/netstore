import { IItem } from 'app/shared/model/item.model';

export interface ITax {
  id?: number;
  percentage?: number;
  concept?: string;
  item?: IItem;
}

export class Tax implements ITax {
  constructor(public id?: number, public percentage?: number, public concept?: string, public item?: IItem) {}
}
