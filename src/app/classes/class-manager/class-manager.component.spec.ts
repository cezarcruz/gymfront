import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { Modality } from '../../core/models';
import { Teacher } from '../../core/models/teacher';
import {
  ClassesService,
  ModalityService,
  TeacherService,
} from '../../core/services';
import { ClassManagerComponent } from './class-manager.component';

describe('ClassManagerComponent', () => {
  const modalityServiceStub: Partial<ModalityService> = {};
  const teacherServiceStub: Partial<TeacherService> = {};
  const classesServiceStub: Partial<ClassesService> = {};
  const messageServiceStub: Partial<MessageService> = {};

  let component: ClassManagerComponent;
  let fixture: ComponentFixture<ClassManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassManagerComponent, NoopAnimationsModule],
      providers: [
        { provide: ModalityService, useValue: modalityServiceStub },
        { provide: TeacherService, useValue: teacherServiceStub },
        { provide: ClassesService, useValue: classesServiceStub },
        { provide: MessageService, useValeu: messageServiceStub },
      ],
    }).compileComponents();

    modalityServiceStub.findAll = () => of([] as Modality[]);
    teacherServiceStub.getAll = () => of([] as Teacher[]);

    fixture = TestBed.createComponent(ClassManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
