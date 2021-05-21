import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePageComponent } from './page.component';

describe('PagePageComponent', () => {
  let component: PagePageComponent;
  let fixture: ComponentFixture<PagePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
