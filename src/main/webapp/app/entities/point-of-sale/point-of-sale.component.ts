import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPointOfSale } from 'app/shared/model/point-of-sale.model';
import { PointOfSaleService } from './point-of-sale.service';
import { PointOfSaleDeleteDialogComponent } from './point-of-sale-delete-dialog.component';

@Component({
  selector: 'jhi-point-of-sale',
  templateUrl: './point-of-sale.component.html',
})
export class PointOfSaleComponent implements OnInit, OnDestroy {
  pointOfSales?: IPointOfSale[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected pointOfSaleService: PointOfSaleService,
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
      this.pointOfSaleService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IPointOfSale[]>) => (this.pointOfSales = res.body || []));
      return;
    }

    this.pointOfSaleService.query().subscribe((res: HttpResponse<IPointOfSale[]>) => (this.pointOfSales = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPointOfSales();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPointOfSale): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPointOfSales(): void {
    this.eventSubscriber = this.eventManager.subscribe('pointOfSaleListModification', () => this.loadAll());
  }

  delete(pointOfSale: IPointOfSale): void {
    const modalRef = this.modalService.open(PointOfSaleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pointOfSale = pointOfSale;
  }
}
