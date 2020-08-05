import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NetstoreTestModule } from '../../../test.module';
import { SubscriptionProgramDetailComponent } from 'app/entities/subscription-program/subscription-program-detail.component';
import { SubscriptionProgram } from 'app/shared/model/subscription-program.model';

describe('Component Tests', () => {
  describe('SubscriptionProgram Management Detail Component', () => {
    let comp: SubscriptionProgramDetailComponent;
    let fixture: ComponentFixture<SubscriptionProgramDetailComponent>;
    const route = ({ data: of({ subscriptionProgram: new SubscriptionProgram(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NetstoreTestModule],
        declarations: [SubscriptionProgramDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SubscriptionProgramDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubscriptionProgramDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load subscriptionProgram on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.subscriptionProgram).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
