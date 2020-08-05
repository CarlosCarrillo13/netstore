import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBussinessUnit } from 'app/shared/model/bussiness-unit.model';

@Component({
  selector: 'jhi-bussiness-unit-detail',
  templateUrl: './bussiness-unit-detail.component.html',
})
export class BussinessUnitDetailComponent implements OnInit {
  bussinessUnit: IBussinessUnit | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bussinessUnit }) => (this.bussinessUnit = bussinessUnit));
  }

  previousState(): void {
    window.history.back();
  }
}
