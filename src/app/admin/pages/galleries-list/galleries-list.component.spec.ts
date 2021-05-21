import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleriesListPageComponent } from './galleries-list.component';

describe('GalleriesListPageComponent', () => {
  let component: GalleriesListPageComponent;
  let fixture: ComponentFixture<GalleriesListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleriesListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleriesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
