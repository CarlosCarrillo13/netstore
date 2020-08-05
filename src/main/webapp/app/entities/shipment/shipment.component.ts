import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IShipment } from 'app/shared/model/shipment.model';
import { ShipmentService } from './shipment.service';
import { ShipmentDeleteDialogComponent } from './shipment-delete-dialog.component';

@Component({
  selector: 'jhi-shipment',
  templateUrl: './shipment.component.html',
})
export class ShipmentComponent implements OnInit, OnDestroy {
  shipments?: IShipment[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected shipmentService: ShipmentService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.shipmentService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IShipment[]>) => (this.shipments = res.body || []));
      return;
    }

    this.shipmentService.query().subscribe((res: HttpResponse<IShipment[]>) => (this.shipments = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInShipments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IShipment): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInShipments(): void {
    this.eventSubscriber = this.eventManager.subscribe('shipmentListModification', () => this.loadAll());
  }

  delete(shipment: IShipment): void {
    const modalRef = this.modalService.open(ShipmentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.shipment = shipment;
  }
}
