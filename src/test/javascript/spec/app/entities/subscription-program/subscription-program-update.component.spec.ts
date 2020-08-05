import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { NetstoreTestModule } from '../../../test.module';
import { SubscriptionProgramUpdateComponent } from 'app/entities/subscription-program/subscription-program-update.component';
import { SubscriptionProgramService } from 'app/entities/subscription-program/subscription-program.service';
import { SubscriptionProgram } from 'app/shared/model/subscription-program.model';

describe('Component Tests', () => {
  describe('SubscriptionProgram Management Update Component', () => {
    let comp: SubscriptionProgramUpdateComponent;
    let fixture: ComponentFixture<SubscriptionProgramUpdateComponent>;
    let service: SubscriptionProgramService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NetstoreTestModule],
        declarations: [SubscriptionProgramUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SubscriptionProgramUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubscriptionProgramUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubscriptionProgramService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SubscriptionProgram(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new SubscriptionProgram();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
