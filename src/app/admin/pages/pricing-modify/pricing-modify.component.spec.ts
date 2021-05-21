import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingModifyPageComponent } from './pricing-modify.component';

describe('PricingModifyPageComponent', () => {
  let component: PricingModifyPageComponent;
  let fixture: ComponentFixture<PricingModifyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingModifyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingModifyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
