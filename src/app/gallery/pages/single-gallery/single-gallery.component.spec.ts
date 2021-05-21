import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGalleryComponent } from './single-gallery.component';

describe('SingleGalleryComponent', () => {
  let component: SingleGalleryComponent;
  let fixture: ComponentFixture<SingleGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
