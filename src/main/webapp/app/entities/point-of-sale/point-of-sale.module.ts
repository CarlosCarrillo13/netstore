import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NetstoreSharedModule } from 'app/shared/shared.module';
import { PointOfSaleComponent } from './point-of-sale.component';
import { PointOfSaleDetailComponent } from './point-of-sale-detail.component';
import { PointOfSaleUpdateComponent } from './point-of-sale-update.component';
import { PointOfSaleDeleteDialogComponent } from './point-of-sale-delete-dialog.component';
import { pointOfSaleRoute } from './point-of-sale.route';

@NgModule({
  imports: [NetstoreSharedModule, RouterModule.forChild(pointOfSaleRoute)],
  declarations: [PointOfSaleComponent, PointOfSaleDetailComponent, PointOfSaleUpdateComponent, PointOfSaleDeleteDialogComponent],
  entryComponents: [PointOfSaleDeleteDialogComponent],
})
export class NetstorePointOfSaleModule {}
