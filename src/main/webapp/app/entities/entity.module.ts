import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'bussiness-unit',
        loadChildren: () => import('./bussiness-unit/bussiness-unit.module').then(m => m.NetstoreBussinessUnitModule),
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.NetstoreCategoryModule),
      },
      {
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice.module').then(m => m.NetstoreInvoiceModule),
      },
      {
        path: 'shipment',
        loadChildren: () => import('./shipment/shipment.module').then(m => m.NetstoreShipmentModule),
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.NetstoreLocationModule),
      },
      {
        path: 'point-of-sale',
        loadChildren: () => import('./point-of-sale/point-of-sale.module').then(m => m.NetstorePointOfSaleModule),
      },
      {
        path: 'subscription-program',
        loadChildren: () => import('./subscription-program/subscription-program.module').then(m => m.NetstoreSubscriptionProgramModule),
      },
      {
        path: 'item',
        loadChildren: () => import('./item/item.module').then(m => m.NetstoreItemModule),
      },
      {
        path: 'prize',
        loadChildren: () => import('./prize/prize.module').then(m => m.NetstorePrizeModule),
      },
      {
        path: 'tax',
        loadChildren: () => import('./tax/tax.module').then(m => m.NetstoreTaxModule),
      },
      {
        path: 'discount',
        loadChildren: () => import('./discount/discount.module').then(m => m.NetstoreDiscountModule),
      },
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.NetstoreEmployeeModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class NetstoreEntityModule {}
