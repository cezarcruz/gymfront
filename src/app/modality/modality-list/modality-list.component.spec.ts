import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalityListComponent } from './modality-list.component';

describe('ModalityListComponent', () => {
  let component: ModalityListComponent;
  let fixture: ComponentFixture<ModalityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalityListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
