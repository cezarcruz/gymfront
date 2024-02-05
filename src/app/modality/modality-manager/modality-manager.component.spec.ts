import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModalityService } from '../../core/services';
import { ToastService } from '../../shared/services';
import { ModalityManagerComponent } from './modality-manager.component';

describe('ModalityManagerComponent', () => {
  const modalityServiceStub: Partial<ModalityService> = {};
  const toastServiceStub: Partial<ToastService> = {};

  let component: ModalityManagerComponent;
  let fixture: ComponentFixture<ModalityManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalityManagerComponent, NoopAnimationsModule],
      providers: [
        { provide: ModalityService, useValue: modalityServiceStub },
        { provide: ToastService, useValue: toastServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalityManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
