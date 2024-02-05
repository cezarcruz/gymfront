import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TeacherService } from '../../core/services';
import { ToastService } from '../../shared/services';
import { TeacherManagerComponent } from './teacher-manager.component';

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
