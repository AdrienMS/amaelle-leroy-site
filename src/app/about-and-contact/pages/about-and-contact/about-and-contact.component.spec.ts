import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAndContactPageComponent } from './about-and-contact.component';

describe('AboutAndContactPageComponent', () => {
  let component: AboutAndContactPageComponent;
  let fixture: ComponentFixture<AboutAndContactPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutAndContactPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutAndContactPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
