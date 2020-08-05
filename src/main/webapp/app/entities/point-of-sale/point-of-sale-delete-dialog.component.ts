import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPointOfSale } from 'app/shared/model/point-of-sale.model';
import { PointOfSaleService } from './point-of-sale.service';

@Component({
  templateUrl: './point-of-sale-delete-dialog.component.html',
})
export class PointOfSaleDeleteDialogComponent {
  pointOfSale?: IPointOfSale;

  constructor(
    protected pointOfSaleService: PointOfSaleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pointOfSaleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pointOfSaleListModification');
      this.activeModal.close();
    });
  }
}
