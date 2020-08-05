import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITax, Tax } from 'app/shared/model/tax.model';
import { TaxService } from './tax.service';
import { IItem } from 'app/shared/model/item.model';
import { ItemService } from 'app/entities/item/item.service';

@Component({
  selector: 'jhi-tax-update',
  templateUrl: './tax-update.component.html',
})
export class TaxUpdateComponent implements OnInit {
  isSaving = false;
  items: IItem[] = [];

  editForm = this.fb.group({
    id: [],
    percentage: [],
    concept: [],
    item: [],
  });

  constructor(
    protected taxService: TaxService,
    protected itemService: ItemService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tax }) => {
      this.updateForm(tax);

      this.itemService.query().subscribe((res: HttpResponse<IItem[]>) => (this.items = res.body || []));
    });
  }

  updateForm(tax: ITax): void {
    this.editForm.patchValue({
      id: tax.id,
      percentage: tax.percentage,
      concept: tax.concept,
      item: tax.item,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tax = this.createFromForm();
    if (tax.id !== undefined) {
      this.subscribeToSaveResponse(this.taxService.update(tax));
    } else {
      this.subscribeToSaveResponse(this.taxService.create(tax));
    }
  }

  private createFromForm(): ITax {
    return {
      ...new Tax(),
      id: this.editForm.get(['id'])!.value,
      percentage: this.editForm.get(['percentage'])!.value,
      concept: this.editForm.get(['concept'])!.value,
      item: this.editForm.get(['item'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITax>>): void {
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

  trackById(index: number, item: IItem): any {
    return item.id;
  }
}
