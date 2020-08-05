import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITax } from 'app/shared/model/tax.model';
import { TaxService } from './tax.service';

@Component({
  templateUrl: './tax-delete-dialog.component.html',
})
export class TaxDeleteDialogComponent {
  tax?: ITax;

  constructor(protected taxService: TaxService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taxService.delete(id).subscribe(() => {
      this.eventManager.broadcast('taxListModification');
      this.activeModal.close();
    });
  }
}
