import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBussinessUnit } from 'app/shared/model/bussiness-unit.model';
import { BussinessUnitService } from './bussiness-unit.service';

@Component({
  templateUrl: './bussiness-unit-delete-dialog.component.html',
})
export class BussinessUnitDeleteDialogComponent {
  bussinessUnit?: IBussinessUnit;

  constructor(
    protected bussinessUnitService: BussinessUnitService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bussinessUnitService.delete(id).subscribe(() => {
      this.eventManager.broadcast('bussinessUnitListModification');
      this.activeModal.close();
    });
  }
}
