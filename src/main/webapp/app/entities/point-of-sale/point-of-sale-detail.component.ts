import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPointOfSale } from 'app/shared/model/point-of-sale.model';

@Component({
  selector: 'jhi-point-of-sale-detail',
  templateUrl: './point-of-sale-detail.component.html',
})
export class PointOfSaleDetailComponent implements OnInit {
  pointOfSale: IPointOfSale | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pointOfSale }) => (this.pointOfSale = pointOfSale));
  }

  previousState(): void {
    window.history.back();
  }
}
