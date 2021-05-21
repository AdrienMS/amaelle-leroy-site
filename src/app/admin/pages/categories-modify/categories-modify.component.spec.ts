import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesModifyPageComponent } from './categories-modify.component';

describe('CategoriesModifyComponent', () => {
  let component: CategoriesModifyPageComponent;
  let fixture: ComponentFixture<CategoriesModifyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesModifyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesModifyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
