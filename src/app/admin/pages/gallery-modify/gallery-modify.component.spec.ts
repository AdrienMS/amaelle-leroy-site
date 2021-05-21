import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryModifyPageComponent } from './gallery-modify.component';

describe('GalleryModifyPageComponent', () => {
  let component: GalleryModifyPageComponent;
  let fixture: ComponentFixture<GalleryModifyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryModifyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryModifyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
