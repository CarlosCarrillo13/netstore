import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NetstoreTestModule } from '../../../test.module';
import { SubscriptionProgramComponent } from 'app/entities/subscription-program/subscription-program.component';
import { SubscriptionProgramService } from 'app/entities/subscription-program/subscription-program.service';
import { SubscriptionProgram } from 'app/shared/model/subscription-program.model';

describe('Component Tests', () => {
  describe('SubscriptionProgram Management Component', () => {
    let comp: SubscriptionProgramComponent;
    let fixture: ComponentFixture<SubscriptionProgramComponent>;
    let service: SubscriptionProgramService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NetstoreTestModule],
        declarations: [SubscriptionProgramComponent],
      })
        .overrideTemplate(SubscriptionProgramComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubscriptionProgramComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubscriptionProgramService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SubscriptionProgram(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.subscriptionPrograms && comp.subscriptionPrograms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
