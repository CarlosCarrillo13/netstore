import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITax, Tax } from 'app/shared/model/tax.model';
import { TaxService } from './tax.service';
import { TaxComponent } from './tax.component';
import { TaxDetailComponent } from './tax-detail.component';
import { TaxUpdateComponent } from './tax-update.component';

@Injectable({ providedIn: 'root' })
export class TaxResolve implements Resolve<ITax> {
  constructor(private service: TaxService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITax> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tax: HttpResponse<Tax>) => {
          if (tax.body) {
            return of(tax.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Tax());
  }
}

export const taxRoute: Routes = [
  {
    path: '',
    component: TaxComponent,
    data: {
      authorities: [Authority.SALES],
      pageTitle: 'netstoreApp.tax.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaxDetailComponent,
    resolve: {
      tax: TaxResolve,
    },
    data: {
      authorities: [Authority.SALES],
      pageTitle: 'netstoreApp.tax.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaxUpdateComponent,
    resolve: {
      tax: TaxResolve,
    },
    data: {
      authorities: [Authority.SALES],
      pageTitle: 'netstoreApp.tax.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaxUpdateComponent,
    resolve: {
      tax: TaxResolve,
    },
    data: {
      authorities: [Authority.SALES],
      pageTitle: 'netstoreApp.tax.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
