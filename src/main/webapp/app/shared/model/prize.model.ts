import { IItem } from 'app/shared/model/item.model';
import { IPointOfSale } from 'app/shared/model/point-of-sale.model';

export interface IPrize {
  id?: number;
  symbol?: string;
  country?: string;
  amount?: string;
  item?: IItem;
  pointOfSale?: IPointOfSale;
}

export class Prize implements IPrize {
  constructor(
    public id?: number,
    public symbol?: string,
    public country?: string,
    public amount?: string,
    public item?: IItem,
    public pointOfSale?: IPointOfSale
  ) {}
}
