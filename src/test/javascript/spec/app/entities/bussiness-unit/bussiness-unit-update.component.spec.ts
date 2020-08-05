import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { NetstoreTestModule } from '../../../test.module';
import { BussinessUnitUpdateComponent } from 'app/entities/bussiness-unit/bussiness-unit-update.component';
import { BussinessUnitService } from 'app/entities/bussiness-unit/bussiness-unit.service';
import { BussinessUnit } from 'app/shared/model/bussiness-unit.model';

describe('Component Tests', () => {
  describe('BussinessUnit Management Update Component', () => {
    let comp: BussinessUnitUpdateComponent;
    let fixture: ComponentFixture<BussinessUnitUpdateComponent>;
    let service: BussinessUnitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NetstoreTestModule],
        declarations: [BussinessUnitUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BussinessUnitUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BussinessUnitUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BussinessUnitService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new BussinessUnit(123);
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
        const entity = new BussinessUnit();
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
