import { IBussinessUnit } from 'app/shared/model/bussiness-unit.model';
import { SubType } from 'app/shared/model/enumerations/sub-type.model';

export interface ISubscriptionProgram {
  id?: number;
  subscriptionType?: SubType;
  startDate?: string;
  endDate?: string;
  amount?: string;
  numberOfPos?: number;
  subscriptionProgram?: IBussinessUnit;
}

export class SubscriptionProgram implements ISubscriptionProgram {
  constructor(
    public id?: number,
    public subscriptionType?: SubType,
    public startDate?: string,
    public endDate?: string,
    public amount?: string,
    public numberOfPos?: number,
    public subscriptionProgram?: IBussinessUnit
  ) {}
}
