import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IBussinessUnit } from 'app/shared/model/bussiness-unit.model';

type EntityResponseType = HttpResponse<IBussinessUnit>;
type EntityArrayResponseType = HttpResponse<IBussinessUnit[]>;

@Injectable({ providedIn: 'root' })
export class BussinessUnitService {
  public resourceUrl = SERVER_API_URL + 'api/bussiness-units';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/bussiness-units';

  constructor(protected http: HttpClient) {}

  create(bussinessUnit: IBussinessUnit): Observable<EntityResponseType> {
    return this.http.post<IBussinessUnit>(this.resourceUrl, bussinessUnit, { observe: 'response' });
  }

  update(bussinessUnit: IBussinessUnit): Observable<EntityResponseType> {
    return this.http.put<IBussinessUnit>(this.resourceUrl, bussinessUnit, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBussinessUnit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBussinessUnit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBussinessUnit[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
