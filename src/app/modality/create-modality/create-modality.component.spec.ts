import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModalityComponent } from './create-modality.component';

describe('CreateModalityComponent', () => {
  let component: CreateModalityComponent;
  let fixture: ComponentFixture<CreateModalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateModalityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateModalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
