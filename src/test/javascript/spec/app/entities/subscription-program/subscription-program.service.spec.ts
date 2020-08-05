import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SubscriptionProgramService } from 'app/entities/subscription-program/subscription-program.service';
import { ISubscriptionProgram, SubscriptionProgram } from 'app/shared/model/subscription-program.model';
import { SubType } from 'app/shared/model/enumerations/sub-type.model';

describe('Service Tests', () => {
  describe('SubscriptionProgram Service', () => {
    let injector: TestBed;
    let service: SubscriptionProgramService;
    let httpMock: HttpTestingController;
    let elemDefault: ISubscriptionProgram;
    let expectedResult: ISubscriptionProgram | ISubscriptionProgram[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(SubscriptionProgramService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new SubscriptionProgram(0, SubType.MONTHLY, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a SubscriptionProgram', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new SubscriptionProgram()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a SubscriptionProgram', () => {
        const returnedFromService = Object.assign(
          {
            subscriptionType: 'BBBBBB',
            startDate: 'BBBBBB',
            endDate: 'BBBBBB',
            amount: 'BBBBBB',
            numberOfPos: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of SubscriptionProgram', () => {
        const returnedFromService = Object.assign(
          {
            subscriptionType: 'BBBBBB',
            startDate: 'BBBBBB',
            endDate: 'BBBBBB',
            amount: 'BBBBBB',
            numberOfPos: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a SubscriptionProgram', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
