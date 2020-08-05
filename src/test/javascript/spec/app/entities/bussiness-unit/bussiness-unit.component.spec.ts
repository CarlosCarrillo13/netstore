import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NetstoreTestModule } from '../../../test.module';
import { BussinessUnitComponent } from 'app/entities/bussiness-unit/bussiness-unit.component';
import { BussinessUnitService } from 'app/entities/bussiness-unit/bussiness-unit.service';
import { BussinessUnit } from 'app/shared/model/bussiness-unit.model';

describe('Component Tests', () => {
  describe('BussinessUnit Management Component', () => {
    let comp: BussinessUnitComponent;
    let fixture: ComponentFixture<BussinessUnitComponent>;
    let service: BussinessUnitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NetstoreTestModule],
        declarations: [BussinessUnitComponent],
      })
        .overrideTemplate(BussinessUnitComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BussinessUnitComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BussinessUnitService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new BussinessUnit(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.bussinessUnits && comp.bussinessUnits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
