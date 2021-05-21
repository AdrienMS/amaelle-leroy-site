import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePricingComponent } from './single-pricing.component';

describe('SinglePricingComponent', () => {
  let component: SinglePricingComponent;
  let fixture: ComponentFixture<SinglePricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePricingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
