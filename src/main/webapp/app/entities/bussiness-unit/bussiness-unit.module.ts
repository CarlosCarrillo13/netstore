import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NetstoreSharedModule } from 'app/shared/shared.module';
import { BussinessUnitComponent } from './bussiness-unit.component';
import { BussinessUnitDetailComponent } from './bussiness-unit-detail.component';
import { BussinessUnitUpdateComponent } from './bussiness-unit-update.component';
import { BussinessUnitDeleteDialogComponent } from './bussiness-unit-delete-dialog.component';
import { bussinessUnitRoute } from './bussiness-unit.route';

@NgModule({
  imports: [NetstoreSharedModule, RouterModule.forChild(bussinessUnitRoute)],
  declarations: [BussinessUnitComponent, BussinessUnitDetailComponent, BussinessUnitUpdateComponent, BussinessUnitDeleteDialogComponent],
  entryComponents: [BussinessUnitDeleteDialogComponent],
})
export class NetstoreBussinessUnitModule {}
