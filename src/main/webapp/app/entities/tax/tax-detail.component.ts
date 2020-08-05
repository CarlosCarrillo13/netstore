import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITax } from 'app/shared/model/tax.model';

@Component({
  selector: 'jhi-tax-detail',
  templateUrl: './tax-detail.component.html',
})
export class TaxDetailComponent implements OnInit {
  tax: ITax | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tax }) => (this.tax = tax));
  }

  previousState(): void {
    window.history.back();
  }
}
