import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesService } from '../../core/services';
import { ClassStateManager } from '../class-state-manager.service';
import { ClassesListComponent } from './classes-list.component';

describe('ClassesListComponent', () => {
  const classesServiceStub: Partial<ClassesService> = {};

  let component: ClassesListComponent;
  let fixture: ComponentFixture<ClassesListComponent>;
  let classStateManager: ClassStateManager;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassesListComponent],
      providers: [
        ClassStateManager,
        { provide: ClassesService, useValue: classesServiceStub },
      ],
    }).compileComponents();

    classStateManager = TestBed.inject(ClassStateManager);

    fixture = TestBed.createComponent(ClassesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(classStateManager).toBeTruthy();
  });
});
