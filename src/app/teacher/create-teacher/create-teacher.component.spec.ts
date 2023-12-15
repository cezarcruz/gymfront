import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastService } from './../../shared/services/toast.service';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TeacherService } from '../../core/services';
import { CreateTeacherComponent } from './create-teacher.component';

describe('CreateTeacherComponent', () => {
  let component: CreateTeacherComponent;
  let fixture: ComponentFixture<CreateTeacherComponent>;
  const teacherServiceStub: Partial<TeacherService> = {};
  const toastServiceStub: Partial<ToastService> = {};

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
