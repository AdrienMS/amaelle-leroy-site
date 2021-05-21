import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioModifyPageComponent } from './portfolio-modify.component';

describe('PortfolioModifyPageComponent', () => {
  let component: PortfolioModifyPageComponent;
  let fixture: ComponentFixture<PortfolioModifyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioModifyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioModifyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
