import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalityManagerComponent } from './modality-manager.component';

describe('ModalityManagerComponent', () => {
  let component: ModalityManagerComponent;
  let fixture: ComponentFixture<ModalityManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalityManagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalityManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
