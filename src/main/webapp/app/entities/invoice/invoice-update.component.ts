import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IInvoice, Invoice } from 'app/shared/model/invoice.model';
import { InvoiceService } from './invoice.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee/employee.service';
import { IShipment } from 'app/shared/model/shipment.model';
import { ShipmentService } from 'app/entities/shipment/shipment.service';

type SelectableEntity = IEmployee | IShipment;

@Component({
  selector: 'jhi-invoice-update',
  templateUrl: './invoice-update.component.html',
})
export class InvoiceUpdateComponent implements OnInit {
  isSaving = false;
  invoicevendors: IEmployee[] = [];
  invoiceshipments: IShipment[] = [];

  editForm = this.fb.group({
    id: [],
    totalPrize: [],
    totalTax: [],
    totalDiscount: [],
    date: [],
    recall: [],
    invoiceVendor: [],
    invoiceShipment: [],
  });

  constructor(
    protected invoiceService: InvoiceService,
    protected employeeService: EmployeeService,
    protected shipmentService: ShipmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invoice }) => {
      this.updateForm(invoice);

      this.employeeService
        .query({ filter: 'invoice-is-null' })
        .pipe(
          map((res: HttpResponse<IEmployee[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEmployee[]) => {
          if (!invoice.invoiceVendor || !invoice.invoiceVendor.id) {
            this.invoicevendors = resBody;
          } else {
            this.employeeService
              .find(invoice.invoiceVendor.id)
              .pipe(
                map((subRes: HttpResponse<IEmployee>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEmployee[]) => (this.invoicevendors = concatRes));
          }
        });

      this.shipmentService
        .query({ filter: 'invoice-is-null' })
        .pipe(
          map((res: HttpResponse<IShipment[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IShipment[]) => {
          if (!invoice.invoiceShipment || !invoice.invoiceShipment.id) {
            this.invoiceshipments = resBody;
          } else {
            this.shipmentService
              .find(invoice.invoiceShipment.id)
              .pipe(
                map((subRes: HttpResponse<IShipment>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IShipment[]) => (this.invoiceshipments = concatRes));
          }
        });
    });
  }

  updateForm(invoice: IInvoice): void {
    this.editForm.patchValue({
      id: invoice.id,
      totalPrize: invoice.totalPrize,
      totalTax: invoice.totalTax,
      totalDiscount: invoice.totalDiscount,
      date: invoice.date,
      recall: invoice.recall,
      invoiceVendor: invoice.invoiceVendor,
      invoiceShipment: invoice.invoiceShipment,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const invoice = this.createFromForm();
    if (invoice.id !== undefined) {
      this.subscribeToSaveResponse(this.invoiceService.update(invoice));
    } else {
      this.subscribeToSaveResponse(this.invoiceService.create(invoice));
    }
  }

  private createFromForm(): IInvoice {
    return {
      ...new Invoice(),
      id: this.editForm.get(['id'])!.value,
      totalPrize: this.editForm.get(['totalPrize'])!.value,
      totalTax: this.editForm.get(['totalTax'])!.value,
      totalDiscount: this.editForm.get(['totalDiscount'])!.value,
      date: this.editForm.get(['date'])!.value,
      recall: this.editForm.get(['recall'])!.value,
      invoiceVendor: this.editForm.get(['invoiceVendor'])!.value,
      invoiceShipment: this.editForm.get(['invoiceShipment'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvoice>>): void {
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
