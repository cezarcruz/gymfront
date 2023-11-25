import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpLoadingComponent } from './http-loading.component';

describe('HttpLoadingComponent', () => {
  let component: HttpLoadingComponent;
  let fixture: ComponentFixture<HttpLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpLoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HttpLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
