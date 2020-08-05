import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPointOfSale, PointOfSale } from 'app/shared/model/point-of-sale.model';
import { PointOfSaleService } from './point-of-sale.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';
import { IBussinessUnit } from 'app/shared/model/bussiness-unit.model';
import { BussinessUnitService } from 'app/entities/bussiness-unit/bussiness-unit.service';

type SelectableEntity = ILocation | IBussinessUnit;

@Component({
  selector: 'jhi-point-of-sale-update',
  templateUrl: './point-of-sale-update.component.html',
})
export class PointOfSaleUpdateComponent implements OnInit {
  isSaving = false;
  addresses: ILocation[] = [];
  bussinessunits: IBussinessUnit[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    subscribed: [],
    status: [],
    address: [],
    bussiness: [],
  });

  constructor(
    protected pointOfSaleService: PointOfSaleService,
    protected locationService: LocationService,
    protected bussinessUnitService: BussinessUnitService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pointOfSale }) => {
      this.updateForm(pointOfSale);

      this.locationService
        .query({ filter: 'pointofsale-is-null' })
        .pipe(
          map((res: HttpResponse<ILocation[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ILocation[]) => {
          if (!pointOfSale.address || !pointOfSale.address.id) {
            this.addresses = resBody;
          } else {
            this.locationService
              .find(pointOfSale.address.id)
              .pipe(
                map((subRes: HttpResponse<ILocation>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ILocation[]) => (this.addresses = concatRes));
          }
        });

      this.bussinessUnitService.query().subscribe((res: HttpResponse<IBussinessUnit[]>) => (this.bussinessunits = res.body || []));
    });
  }

  updateForm(pointOfSale: IPointOfSale): void {
    this.editForm.patchValue({
      id: pointOfSale.id,
      name: pointOfSale.name,
      subscribed: pointOfSale.subscribed,
      status: pointOfSale.status,
      address: pointOfSale.address,
      bussiness: pointOfSale.bussiness,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pointOfSale = this.createFromForm();
    if (pointOfSale.id !== undefined) {
      this.subscribeToSaveResponse(this.pointOfSaleService.update(pointOfSale));
    } else {
      this.subscribeToSaveResponse(this.pointOfSaleService.create(pointOfSale));
    }
  }

  private createFromForm(): IPointOfSale {
    return {
      ...new PointOfSale(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      subscribed: this.editForm.get(['subscribed'])!.value,
      status: this.editForm.get(['status'])!.value,
      address: this.editForm.get(['address'])!.value,
      bussiness: this.editForm.get(['bussiness'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPointOfSale>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
