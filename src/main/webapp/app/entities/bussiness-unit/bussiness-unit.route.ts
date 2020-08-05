import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBussinessUnit, BussinessUnit } from 'app/shared/model/bussiness-unit.model';
import { BussinessUnitService } from './bussiness-unit.service';
import { BussinessUnitComponent } from './bussiness-unit.component';
import { BussinessUnitDetailComponent } from './bussiness-unit-detail.component';
import { BussinessUnitUpdateComponent } from './bussiness-unit-update.component';

@Injectable({ providedIn: 'root' })
export class BussinessUnitResolve implements Resolve<IBussinessUnit> {
  constructor(private service: BussinessUnitService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBussinessUnit> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((bussinessUnit: HttpResponse<BussinessUnit>) => {
          if (bussinessUnit.body) {
            return of(bussinessUnit.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BussinessUnit());
  }
}

export const bussinessUnitRoute: Routes = [
  {
    path: '',
    component: BussinessUnitComponent,
    data: {
      authorities: [Authority.SALES],
      pageTitle: 'netstoreApp.bussinessUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BussinessUnitDetailComponent,
    resolve: {
      bussinessUnit: BussinessUnitResolve,
    },
    data: {
      authorities: [Authority.SALES],
      pageTitle: 'netstoreApp.bussinessUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BussinessUnitUpdateComponent,
    resolve: {
      bussinessUnit: BussinessUnitResolve,
    },
    data: {
      authorities: [Authority.SALES],
      pageTitle: 'netstoreApp.bussinessUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BussinessUnitUpdateComponent,
    resolve: {
      bussinessUnit: BussinessUnitResolve,
    },
    data: {
      authorities: [Authority.SALES],
      pageTitle: 'netstoreApp.bussinessUnit.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
