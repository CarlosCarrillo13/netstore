import { IPrize } from 'app/shared/model/prize.model';
import { IDiscount } from 'app/shared/model/discount.model';
import { ITax } from 'app/shared/model/tax.model';
import { ICategory } from 'app/shared/model/category.model';
import { IInvoice } from 'app/shared/model/invoice.model';

export interface IItem {
  id?: number;
  name?: string;
  sku?: string;
  endDate?: string;
  amount?: string;
  itemPrizes?: IPrize[];
  itemDiscounts?: IDiscount[];
  itemTaxes?: ITax[];
  itemCategory?: ICategory;
  invoice?: IInvoice;
}

export class Item implements IItem {
  constructor(
    public id?: number,
    public name?: string,
    public sku?: string,
    public endDate?: string,
    public amount?: string,
    public itemPrizes?: IPrize[],
    public itemDiscounts?: IDiscount[],
    public itemTaxes?: ITax[],
    public itemCategory?: ICategory,
    public invoice?: IInvoice
  ) {}
}
