import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPrize, Prize } from 'app/shared/model/prize.model';
import { PrizeService } from './prize.service';
import { IItem } from 'app/shared/model/item.model';
import { ItemService } from 'app/entities/item/item.service';
import { IPointOfSale } from 'app/shared/model/point-of-sale.model';
import { PointOfSaleService } from 'app/entities/point-of-sale/point-of-sale.service';

type SelectableEntity = IItem | IPointOfSale;

@Component({
  selector: 'jhi-prize-update',
  templateUrl: './prize-update.component.html',
})
export class PrizeUpdateComponent implements OnInit {
  isSaving = false;
  items: IItem[] = [];
  pointofsales: IPointOfSale[] = [];

  editForm = this.fb.group({
    id: [],
    symbol: [],
    country: [],
    amount: [],
    item: [],
    pointOfSale: [],
  });

  constructor(
    protected prizeService: PrizeService,
    protected itemService: ItemService,
    protected pointOfSaleService: PointOfSaleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prize }) => {
      this.updateForm(prize);

      this.itemService.query().subscribe((res: HttpResponse<IItem[]>) => (this.items = res.body || []));

      this.pointOfSaleService.query().subscribe((res: HttpResponse<IPointOfSale[]>) => (this.pointofsales = res.body || []));
    });
  }

  updateForm(prize: IPrize): void {
    this.editForm.patchValue({
      id: prize.id,
      symbol: prize.symbol,
      country: prize.country,
      amount: prize.amount,
      item: prize.item,
      pointOfSale: prize.pointOfSale,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const prize = this.createFromForm();
    if (prize.id !== undefined) {
      this.subscribeToSaveResponse(this.prizeService.update(prize));
    } else {
      this.subscribeToSaveResponse(this.prizeService.create(prize));
    }
  }

  private createFromForm(): IPrize {
    return {
      ...new Prize(),
      id: this.editForm.get(['id'])!.value,
      symbol: this.editForm.get(['symbol'])!.value,
      country: this.editForm.get(['country'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      item: this.editForm.get(['item'])!.value,
      pointOfSale: this.editForm.get(['pointOfSale'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrize>>): void {
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
