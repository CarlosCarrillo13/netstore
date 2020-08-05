import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubscriptionProgram } from 'app/shared/model/subscription-program.model';

@Component({
  selector: 'jhi-subscription-program-detail',
  templateUrl: './subscription-program-detail.component.html',
})
export class SubscriptionProgramDetailComponent implements OnInit {
  subscriptionProgram: ISubscriptionProgram | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subscriptionProgram }) => (this.subscriptionProgram = subscriptionProgram));
  }

  previousState(): void {
    window.history.back();
  }
}
