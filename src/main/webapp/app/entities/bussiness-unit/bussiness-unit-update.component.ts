import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBussinessUnit, BussinessUnit } from 'app/shared/model/bussiness-unit.model';
import { BussinessUnitService } from './bussiness-unit.service';
import { ISubscriptionProgram } from 'app/shared/model/subscription-program.model';
import { SubscriptionProgramService } from 'app/entities/subscription-program/subscription-program.service';

@Component({
  selector: 'jhi-bussiness-unit-update',
  templateUrl: './bussiness-unit-update.component.html',
})
export class BussinessUnitUpdateComponent implements OnInit {
  isSaving = false;
  bussinesses: ISubscriptionProgram[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    nit: [],
    brand: [],
    active: [],
    bussiness: [],
  });

  constructor(
    protected bussinessUnitService: BussinessUnitService,
    protected subscriptionProgramService: SubscriptionProgramService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bussinessUnit }) => {
      this.updateForm(bussinessUnit);

      this.subscriptionProgramService
        .query({ filter: 'subscriptionprogram-is-null' })
        .pipe(
          map((res: HttpResponse<ISubscriptionProgram[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ISubscriptionProgram[]) => {
          if (!bussinessUnit.bussiness || !bussinessUnit.bussiness.id) {
            this.bussinesses = resBody;
          } else {
            this.subscriptionProgramService
              .find(bussinessUnit.bussiness.id)
              .pipe(
                map((subRes: HttpResponse<ISubscriptionProgram>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ISubscriptionProgram[]) => (this.bussinesses = concatRes));
          }
        });
    });
  }

  updateForm(bussinessUnit: IBussinessUnit): void {
    this.editForm.patchValue({
      id: bussinessUnit.id,
      name: bussinessUnit.name,
      nit: bussinessUnit.nit,
      brand: bussinessUnit.brand,
      active: bussinessUnit.active,
      bussiness: bussinessUnit.bussiness,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bussinessUnit = this.createFromForm();
    if (bussinessUnit.id !== undefined) {
      this.subscribeToSaveResponse(this.bussinessUnitService.update(bussinessUnit));
    } else {
      this.subscribeToSaveResponse(this.bussinessUnitService.create(bussinessUnit));
    }
  }

  private createFromForm(): IBussinessUnit {
    return {
      ...new BussinessUnit(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      nit: this.editForm.get(['nit'])!.value,
      brand: this.editForm.get(['brand'])!.value,
      active: this.editForm.get(['active'])!.value,
      bussiness: this.editForm.get(['bussiness'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBussinessUnit>>): void {
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

  trackById(index: number, item: ISubscriptionProgram): any {
    return item.id;
  }
}
