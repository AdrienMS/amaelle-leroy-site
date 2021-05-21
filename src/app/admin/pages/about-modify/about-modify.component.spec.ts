import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutModifyPageComponent } from './about-modify.component';

describe('AboutModifyComponent', () => {
  let component: AboutModifyPageComponent;
  let fixture: ComponentFixture<AboutModifyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutModifyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutModifyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
