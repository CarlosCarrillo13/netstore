import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NetstoreTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { SubscriptionProgramDeleteDialogComponent } from 'app/entities/subscription-program/subscription-program-delete-dialog.component';
import { SubscriptionProgramService } from 'app/entities/subscription-program/subscription-program.service';

describe('Component Tests', () => {
  describe('SubscriptionProgram Management Delete Component', () => {
    let comp: SubscriptionProgramDeleteDialogComponent;
    let fixture: ComponentFixture<SubscriptionProgramDeleteDialogComponent>;
    let service: SubscriptionProgramService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NetstoreTestModule],
        declarations: [SubscriptionProgramDeleteDialogComponent],
      })
        .overrideTemplate(SubscriptionProgramDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubscriptionProgramDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubscriptionProgramService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
