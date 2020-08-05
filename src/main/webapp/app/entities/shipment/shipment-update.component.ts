import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IShipment, Shipment } from 'app/shared/model/shipment.model';
import { ShipmentService } from './shipment.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location/location.service';

@Component({
  selector: 'jhi-shipment-update',
  templateUrl: './shipment-update.component.html',
})
export class ShipmentUpdateComponent implements OnInit {
  isSaving = false;
  shipmentaddresses: ILocation[] = [];

  editForm = this.fb.group({
    id: [],
    shipDate: [],
    estimatedArrivalDate: [],
    deliveryStatus: [],
    trackingNumber: [],
    shippingCompany: [],
    shipmentAddress: [],
  });

  constructor(
    protected shipmentService: ShipmentService,
    protected locationService: LocationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shipment }) => {
      this.updateForm(shipment);

      this.locationService
        .query({ filter: 'shipment-is-null' })
        .pipe(
          map((res: HttpResponse<ILocation[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ILocation[]) => {
          if (!shipment.shipmentAddress || !shipment.shipmentAddress.id) {
            this.shipmentaddresses = resBody;
          } else {
            this.locationService
              .find(shipment.shipmentAddress.id)
              .pipe(
                map((subRes: HttpResponse<ILocation>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ILocation[]) => (this.shipmentaddresses = concatRes));
          }
        });
    });
  }

  updateForm(shipment: IShipment): void {
    this.editForm.patchValue({
      id: shipment.id,
      shipDate: shipment.shipDate,
      estimatedArrivalDate: shipment.estimatedArrivalDate,
      deliveryStatus: shipment.deliveryStatus,
      trackingNumber: shipment.trackingNumber,
      shippingCompany: shipment.shippingCompany,
      shipmentAddress: shipment.shipmentAddress,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shipment = this.createFromForm();
    if (shipment.id !== undefined) {
      this.subscribeToSaveResponse(this.shipmentService.update(shipment));
    } else {
      this.subscribeToSaveResponse(this.shipmentService.create(shipment));
    }
  }

  private createFromForm(): IShipment {
    return {
      ...new Shipment(),
      id: this.editForm.get(['id'])!.value,
      shipDate: this.editForm.get(['shipDate'])!.value,
      estimatedArrivalDate: this.editForm.get(['estimatedArrivalDate'])!.value,
      deliveryStatus: this.editForm.get(['deliveryStatus'])!.value,
      trackingNumber: this.editForm.get(['trackingNumber'])!.value,
      shippingCompany: this.editForm.get(['shippingCompany'])!.value,
      shipmentAddress: this.editForm.get(['shipmentAddress'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShipment>>): void {
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

  trackById(index: number, item: ILocation): any {
    return item.id;
  }
}
