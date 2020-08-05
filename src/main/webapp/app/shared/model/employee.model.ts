import { Moment } from 'moment';
import { IPointOfSale } from 'app/shared/model/point-of-sale.model';

export interface IEmployee {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  hireDate?: Moment;
  salary?: number;
  commissionPct?: number;
  employeeManagers?: IEmployee[];
  pointOfSale?: IPointOfSale;
  employee?: IEmployee;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public hireDate?: Moment,
    public salary?: number,
    public commissionPct?: number,
    public employeeManagers?: IEmployee[],
    public pointOfSale?: IPointOfSale,
    public employee?: IEmployee
  ) {}
}
