import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubscriptionProgram } from 'app/shared/model/subscription-program.model';
import { SubscriptionProgramService } from './subscription-program.service';

@Component({
  templateUrl: './subscription-program-delete-dialog.component.html',
})
export class SubscriptionProgramDeleteDialogComponent {
  subscriptionProgram?: ISubscriptionProgram;

  constructor(
    protected subscriptionProgramService: SubscriptionProgramService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.subscriptionProgramService.delete(id).subscribe(() => {
      this.eventManager.broadcast('subscriptionProgramListModification');
      this.activeModal.close();
    });
  }
}
