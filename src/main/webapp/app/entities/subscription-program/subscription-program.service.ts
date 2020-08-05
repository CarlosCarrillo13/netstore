import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { ISubscriptionProgram } from 'app/shared/model/subscription-program.model';

type EntityResponseType = HttpResponse<ISubscriptionProgram>;
type EntityArrayResponseType = HttpResponse<ISubscriptionProgram[]>;

@Injectable({ providedIn: 'root' })
export class SubscriptionProgramService {
  public resourceUrl = SERVER_API_URL + 'api/subscription-programs';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/subscription-programs';

  constructor(protected http: HttpClient) {}

  create(subscriptionProgram: ISubscriptionProgram): Observable<EntityResponseType> {
    return this.http.post<ISubscriptionProgram>(this.resourceUrl, subscriptionProgram, { observe: 'response' });
  }

  update(subscriptionProgram: ISubscriptionProgram): Observable<EntityResponseType> {
    return this.http.put<ISubscriptionProgram>(this.resourceUrl, subscriptionProgram, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISubscriptionProgram>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubscriptionProgram[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubscriptionProgram[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
