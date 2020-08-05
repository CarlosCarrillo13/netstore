import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NetstoreSharedModule } from 'app/shared/shared.module';
import { SubscriptionProgramComponent } from './subscription-program.component';
import { SubscriptionProgramDetailComponent } from './subscription-program-detail.component';
import { SubscriptionProgramUpdateComponent } from './subscription-program-update.component';
import { SubscriptionProgramDeleteDialogComponent } from './subscription-program-delete-dialog.component';
import { subscriptionProgramRoute } from './subscription-program.route';

@NgModule({
  imports: [NetstoreSharedModule, RouterModule.forChild(subscriptionProgramRoute)],
  declarations: [
    SubscriptionProgramComponent,
    SubscriptionProgramDetailComponent,
    SubscriptionProgramUpdateComponent,
    SubscriptionProgramDeleteDialogComponent,
  ],
  entryComponents: [SubscriptionProgramDeleteDialogComponent],
})
export class NetstoreSubscriptionProgramModule {}
