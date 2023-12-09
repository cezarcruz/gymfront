import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherListComponent } from './teacher-list.component';
import { TeacherService } from '../../core/services';

describe('TeacherListComponent', () => {
  let component: TeacherListComponent;
  let fixture: ComponentFixture<TeacherListComponent>;

  const teacherServiceStub: Partial<TeacherService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherListComponent],
      providers: [
        {
          provide: TeacherService,
          useValue: teacherServiceStub,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
