import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IPointOfSale } from 'app/shared/model/point-of-sale.model';

type EntityResponseType = HttpResponse<IPointOfSale>;
type EntityArrayResponseType = HttpResponse<IPointOfSale[]>;

@Injectable({ providedIn: 'root' })
export class PointOfSaleService {
  public resourceUrl = SERVER_API_URL + 'api/point-of-sales';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/point-of-sales';

  constructor(protected http: HttpClient) {}

  create(pointOfSale: IPointOfSale): Observable<EntityResponseType> {
    return this.http.post<IPointOfSale>(this.resourceUrl, pointOfSale, { observe: 'response' });
  }

  update(pointOfSale: IPointOfSale): Observable<EntityResponseType> {
    return this.http.put<IPointOfSale>(this.resourceUrl, pointOfSale, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPointOfSale>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPointOfSale[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPointOfSale[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
