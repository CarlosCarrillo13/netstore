import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISubscriptionProgram, SubscriptionProgram } from 'app/shared/model/subscription-program.model';
import { SubscriptionProgramService } from './subscription-program.service';

@Component({
  selector: 'jhi-subscription-program-update',
  templateUrl: './subscription-program-update.component.html',
})
export class SubscriptionProgramUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    subscriptionType: [],
    startDate: [],
    endDate: [],
    amount: [],
    numberOfPos: [],
  });

  constructor(
    protected subscriptionProgramService: SubscriptionProgramService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subscriptionProgram }) => {
      this.updateForm(subscriptionProgram);
    });
  }

  updateForm(subscriptionProgram: ISubscriptionProgram): void {
    this.editForm.patchValue({
      id: subscriptionProgram.id,
      subscriptionType: subscriptionProgram.subscriptionType,
      startDate: subscriptionProgram.startDate,
      endDate: subscriptionProgram.endDate,
      amount: subscriptionProgram.amount,
      numberOfPos: subscriptionProgram.numberOfPos,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subscriptionProgram = this.createFromForm();
    if (subscriptionProgram.id !== undefined) {
      this.subscribeToSaveResponse(this.subscriptionProgramService.update(subscriptionProgram));
    } else {
      this.subscribeToSaveResponse(this.subscriptionProgramService.create(subscriptionProgram));
    }
  }

  private createFromForm(): ISubscriptionProgram {
    return {
      ...new SubscriptionProgram(),
      id: this.editForm.get(['id'])!.value,
      subscriptionType: this.editForm.get(['subscriptionType'])!.value,
      startDate: this.editForm.get(['startDate'])!.value,
      endDate: this.editForm.get(['endDate'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      numberOfPos: this.editForm.get(['numberOfPos'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubscriptionProgram>>): void {
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
}
