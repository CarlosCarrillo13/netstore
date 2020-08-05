import { IItem } from 'app/shared/model/item.model';
import { IBussinessUnit } from 'app/shared/model/bussiness-unit.model';

export interface ICategory {
  id?: number;
  name?: string;
  uuid?: string;
  items?: IItem[];
  bussiness?: IBussinessUnit;
}

export class Category implements ICategory {
  constructor(public id?: number, public name?: string, public uuid?: string, public items?: IItem[], public bussiness?: IBussinessUnit) {}
}
