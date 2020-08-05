import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NetstoreTestModule } from '../../../test.module';
import { BussinessUnitDetailComponent } from 'app/entities/bussiness-unit/bussiness-unit-detail.component';
import { BussinessUnit } from 'app/shared/model/bussiness-unit.model';

describe('Component Tests', () => {
  describe('BussinessUnit Management Detail Component', () => {
    let comp: BussinessUnitDetailComponent;
    let fixture: ComponentFixture<BussinessUnitDetailComponent>;
    const route = ({ data: of({ bussinessUnit: new BussinessUnit(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NetstoreTestModule],
        declarations: [BussinessUnitDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BussinessUnitDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BussinessUnitDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load bussinessUnit on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bussinessUnit).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
