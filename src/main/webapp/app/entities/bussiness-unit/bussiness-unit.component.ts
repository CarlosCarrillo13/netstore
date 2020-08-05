import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBussinessUnit } from 'app/shared/model/bussiness-unit.model';
import { BussinessUnitService } from './bussiness-unit.service';
import { BussinessUnitDeleteDialogComponent } from './bussiness-unit-delete-dialog.component';

@Component({
  selector: 'jhi-bussiness-unit',
  templateUrl: './bussiness-unit.component.html',
})
export class BussinessUnitComponent implements OnInit, OnDestroy {
  bussinessUnits?: IBussinessUnit[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected bussinessUnitService: BussinessUnitService,
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
      this.bussinessUnitService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IBussinessUnit[]>) => (this.bussinessUnits = res.body || []));
      return;
    }

    this.bussinessUnitService.query().subscribe((res: HttpResponse<IBussinessUnit[]>) => (this.bussinessUnits = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBussinessUnits();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBussinessUnit): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBussinessUnits(): void {
    this.eventSubscriber = this.eventManager.subscribe('bussinessUnitListModification', () => this.loadAll());
  }

  delete(bussinessUnit: IBussinessUnit): void {
    const modalRef = this.modalService.open(BussinessUnitDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.bussinessUnit = bussinessUnit;
  }
}
