import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { NetstoreTestModule } from '../../../test.module';
import { PointOfSaleUpdateComponent } from 'app/entities/point-of-sale/point-of-sale-update.component';
import { PointOfSaleService } from 'app/entities/point-of-sale/point-of-sale.service';
import { PointOfSale } from 'app/shared/model/point-of-sale.model';

describe('Component Tests', () => {
  describe('PointOfSale Management Update Component', () => {
    let comp: PointOfSaleUpdateComponent;
    let fixture: ComponentFixture<PointOfSaleUpdateComponent>;
    let service: PointOfSaleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NetstoreTestModule],
        declarations: [PointOfSaleUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PointOfSaleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PointOfSaleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PointOfSaleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PointOfSale(123);
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
        const entity = new PointOfSale();
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
