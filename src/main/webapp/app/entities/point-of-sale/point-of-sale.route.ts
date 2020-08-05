import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPointOfSale, PointOfSale } from 'app/shared/model/point-of-sale.model';
import { PointOfSaleService } from './point-of-sale.service';
import { PointOfSaleComponent } from './point-of-sale.component';
import { PointOfSaleDetailComponent } from './point-of-sale-detail.component';
import { PointOfSaleUpdateComponent } from './point-of-sale-update.component';

@Injectable({ providedIn: 'root' })
export class PointOfSaleResolve implements Resolve<IPointOfSale> {
  constructor(private service: PointOfSaleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPointOfSale> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pointOfSale: HttpResponse<PointOfSale>) => {
          if (pointOfSale.body) {
            return of(pointOfSale.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PointOfSale());
  }
}

export const pointOfSaleRoute: Routes = [
  {
    path: '',
    component: PointOfSaleComponent,
    data: {
      authorities: [Authority.SALES],
      pageTitle: 'netstoreApp.pointOfSale.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PointOfSaleDetailComponent,
    resolve: {
      pointOfSale: PointOfSaleResolve,
    },
    data: {
      authorities: [Authority.SALES],
      pageTitle: 'netstoreApp.pointOfSale.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PointOfSaleUpdateComponent,
    resolve: {
      pointOfSale: PointOfSaleResolve,
    },
    data: {
      authorities: [Authority.SALES],
      pageTitle: 'netstoreApp.pointOfSale.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PointOfSaleUpdateComponent,
    resolve: {
      pointOfSale: PointOfSaleResolve,
    },
    data: {
      authorities: [Authority.SALES],
      pageTitle: 'netstoreApp.pointOfSale.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
