import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMessagesPageComponent } from './contact-messages.component';

describe('ContactMessagesPageComponent', () => {
  let component: ContactMessagesPageComponent;
  let fixture: ComponentFixture<ContactMessagesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactMessagesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactMessagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
