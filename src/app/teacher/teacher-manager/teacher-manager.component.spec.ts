import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherManagerComponent } from './teacher-manager.component';
import { TeacherService, ToastService } from '../../core/services';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TeacherManagerComponent', () => {
  let component: TeacherManagerComponent;
  let fixture: ComponentFixture<TeacherManagerComponent>;

  const teacherServiceStub: Partial<TeacherService> = {};
  const toastServiceStub: Partial<ToastService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherManagerComponent, NoopAnimationsModule],
      providers: [
        { provide: TeacherService, useValue: teacherServiceStub },
        { provide: ToastService, useValue: toastServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
