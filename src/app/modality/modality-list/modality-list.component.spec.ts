import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalityService } from '../../core/services';
import { ModalityStateService } from '../modality-state.service';
import { ModalityListComponent } from './modality-list.component';

describe('ModalityListComponent', () => {
  const modalityServiceStub: Partial<ModalityService> = {};

  let stateService: ModalityStateService;
  let component: ModalityListComponent;
  let fixture: ComponentFixture<ModalityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalityListComponent],
      providers: [
        ModalityStateService,
        { provide: ModalityService, useValue: modalityServiceStub },
      ],
    }).compileComponents();

    stateService = TestBed.inject(ModalityStateService);

    fixture = TestBed.createComponent(ModalityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(stateService).toBeTruthy();
  });
});
