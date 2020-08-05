import { ISubscriptionProgram } from 'app/shared/model/subscription-program.model';
import { ICategory } from 'app/shared/model/category.model';
import { IPointOfSale } from 'app/shared/model/point-of-sale.model';

export interface IBussinessUnit {
  id?: number;
  name?: string;
  nit?: string;
  brand?: string;
  active?: boolean;
  bussiness?: ISubscriptionProgram;
  bussinessCategories?: ICategory[];
  bussinessPOS?: IPointOfSale[];
}

export class BussinessUnit implements IBussinessUnit {
  constructor(
    public id?: number,
    public name?: string,
    public nit?: string,
    public brand?: string,
    public active?: boolean,
    public bussiness?: ISubscriptionProgram,
    public bussinessCategories?: ICategory[],
    public bussinessPOS?: IPointOfSale[]
  ) {
    this.active = this.active || false;
  }
}
