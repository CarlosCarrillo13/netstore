import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NetstoreTestModule } from '../../../test.module';
import { PointOfSaleComponent } from 'app/entities/point-of-sale/point-of-sale.component';
import { PointOfSaleService } from 'app/entities/point-of-sale/point-of-sale.service';
import { PointOfSale } from 'app/shared/model/point-of-sale.model';

describe('Component Tests', () => {
  describe('PointOfSale Management Component', () => {
    let comp: PointOfSaleComponent;
    let fixture: ComponentFixture<PointOfSaleComponent>;
    let service: PointOfSaleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NetstoreTestModule],
        declarations: [PointOfSaleComponent],
      })
        .overrideTemplate(PointOfSaleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PointOfSaleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PointOfSaleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PointOfSale(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pointOfSales && comp.pointOfSales[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
