import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NetstoreTestModule } from '../../../test.module';
import { PointOfSaleDetailComponent } from 'app/entities/point-of-sale/point-of-sale-detail.component';
import { PointOfSale } from 'app/shared/model/point-of-sale.model';

describe('Component Tests', () => {
  describe('PointOfSale Management Detail Component', () => {
    let comp: PointOfSaleDetailComponent;
    let fixture: ComponentFixture<PointOfSaleDetailComponent>;
    const route = ({ data: of({ pointOfSale: new PointOfSale(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NetstoreTestModule],
        declarations: [PointOfSaleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PointOfSaleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PointOfSaleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pointOfSale on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pointOfSale).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
