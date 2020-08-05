import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISubscriptionProgram, SubscriptionProgram } from 'app/shared/model/subscription-program.model';
import { SubscriptionProgramService } from './subscription-program.service';
import { SubscriptionProgramComponent } from './subscription-program.component';
import { SubscriptionProgramDetailComponent } from './subscription-program-detail.component';
import { SubscriptionProgramUpdateComponent } from './subscription-program-update.component';

@Injectable({ providedIn: 'root' })
export class SubscriptionProgramResolve implements Resolve<ISubscriptionProgram> {
  constructor(private service: SubscriptionProgramService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISubscriptionProgram> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((subscriptionProgram: HttpResponse<SubscriptionProgram>) => {
          if (subscriptionProgram.body) {
            return of(subscriptionProgram.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SubscriptionProgram());
  }
}

export const subscriptionProgramRoute: Routes = [
  {
    path: '',
    component: SubscriptionProgramComponent,
    data: {
      authorities: [Authority.SALES],
      pageTitle: 'netstoreApp.subscriptionProgram.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SubscriptionProgramDetailComponent,
    resolve: {
      subscriptionProgram: SubscriptionProgramResolve,
    },
    data: {
      authorities: [Authority.SALES],
      pageTitle: 'netstoreApp.subscriptionProgram.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SubscriptionProgramUpdateComponent,
    resolve: {
      subscriptionProgram: SubscriptionProgramResolve,
    },
    data: {
      authorities: [Authority.SALES],
      pageTitle: 'netstoreApp.subscriptionProgram.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SubscriptionProgramUpdateComponent,
    resolve: {
      subscriptionProgram: SubscriptionProgramResolve,
    },
    data: {
      authorities: [Authority.SALES],
      pageTitle: 'netstoreApp.subscriptionProgram.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
