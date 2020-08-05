import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubscriptionProgram } from 'app/shared/model/subscription-program.model';
import { SubscriptionProgramService } from './subscription-program.service';
import { SubscriptionProgramDeleteDialogComponent } from './subscription-program-delete-dialog.component';

@Component({
  selector: 'jhi-subscription-program',
  templateUrl: './subscription-program.component.html',
})
export class SubscriptionProgramComponent implements OnInit, OnDestroy {
  subscriptionPrograms?: ISubscriptionProgram[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected subscriptionProgramService: SubscriptionProgramService,
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
      this.subscriptionProgramService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<ISubscriptionProgram[]>) => (this.subscriptionPrograms = res.body || []));
      return;
    }

    this.subscriptionProgramService
      .query()
      .subscribe((res: HttpResponse<ISubscriptionProgram[]>) => (this.subscriptionPrograms = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSubscriptionPrograms();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISubscriptionProgram): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSubscriptionPrograms(): void {
    this.eventSubscriber = this.eventManager.subscribe('subscriptionProgramListModification', () => this.loadAll());
  }

  delete(subscriptionProgram: ISubscriptionProgram): void {
    const modalRef = this.modalService.open(SubscriptionProgramDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subscriptionProgram = subscriptionProgram;
  }
}
