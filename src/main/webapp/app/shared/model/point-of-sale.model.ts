import { ILocation } from 'app/shared/model/location.model';
import { IPrize } from 'app/shared/model/prize.model';
import { IEmployee } from 'app/shared/model/employee.model';
import { IBussinessUnit } from 'app/shared/model/bussiness-unit.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IPointOfSale {
  id?: number;
  name?: string;
  subscribed?: boolean;
  status?: Status;
  address?: ILocation;
  pointOfSalePrizes?: IPrize[];
  pointOfSaleEmployees?: IEmployee[];
  bussiness?: IBussinessUnit;
}

export class PointOfSale implements IPointOfSale {
  constructor(
    public id?: number,
    public name?: string,
    public subscribed?: boolean,
    public status?: Status,
    public address?: ILocation,
    public pointOfSalePrizes?: IPrize[],
    public pointOfSaleEmployees?: IEmployee[],
    public bussiness?: IBussinessUnit
  ) {
    this.subscribed = this.subscribed || false;
  }
}
