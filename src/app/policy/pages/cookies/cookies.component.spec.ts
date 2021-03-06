import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesPageComponent } from './cookies.component';

describe('CookiesPageComponent', () => {
  let component: CookiesPageComponent;
  let fixture: ComponentFixture<CookiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookiesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
