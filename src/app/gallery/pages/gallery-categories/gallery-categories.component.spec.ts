import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryCategoriesPageComponent } from './gallery-categories.component';

describe('GalleryCategoriesPageComponent', () => {
  let component: GalleryCategoriesPageComponent;
  let fixture: ComponentFixture<GalleryCategoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryCategoriesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryCategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
