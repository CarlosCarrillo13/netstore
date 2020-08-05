import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IInvoice } from 'app/shared/model/invoice.model';

type EntityResponseType = HttpResponse<IInvoice>;
type EntityArrayResponseType = HttpResponse<IInvoice[]>;

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  public resourceUrl = SERVER_API_URL + 'api/invoices';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/invoices';

  constructor(protected http: HttpClient) {}

  create(invoice: IInvoice): Observable<EntityResponseType> {
    return this.http.post<IInvoice>(this.resourceUrl, invoice, { observe: 'response' });
  }

  update(invoice: IInvoice): Observable<EntityResponseType> {
    return this.http.put<IInvoice>(this.resourceUrl, invoice, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInvoice>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInvoice[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInvoice[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
