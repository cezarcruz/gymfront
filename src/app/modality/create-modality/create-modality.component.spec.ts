import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClassesService, ModalityService } from '../../core/services';
import { ToastService } from '../../shared/services';
import { CreateModalityComponent } from './create-modality.component';

describe('CreateModalityComponent', () => {
  const classesServiceStub: Partial<ClassesService> = {};
  const modalityServiceStub: Partial<ModalityService> = {};
  const toastServiceStub: Partial<ToastService> = {};

  let component: CreateModalityComponent;
  let fixture: ComponentFixture<CreateModalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateModalityComponent, NoopAnimationsModule],
      providers: [
        { provide: ClassesService, useValue: classesServiceStub },
        { provide: ModalityService, useValue: modalityServiceStub },
        { provide: ToastService, useValue: toastServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateModalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*

const teacherServiceStub: Partial<TeacherService> = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTeacherComponent, NoopAnimationsModule],
      providers: [
        { provide: TeacherService, useValue: teacherServiceStub },
        { provide: ToastService, useValue: toastServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
*/
