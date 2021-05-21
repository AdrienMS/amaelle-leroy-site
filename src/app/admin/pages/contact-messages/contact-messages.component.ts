import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { Contact, ContactService } from '../../../core';

@Component({
  selector: 'app-contact-messages',
  templateUrl: './contact-messages.component.html',
  styleUrls: ['./contact-messages.component.scss']
})
export class ContactMessagesPageComponent implements OnInit, OnDestroy {
  public contacts$: Observable<Contact[]>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  private contacts: Array<Contact> = [];

  public selected = 0;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  private getContacts() {
    this.contacts$ = this.contactService.getContacts().pipe(
      map(contacts => contacts.reverse()),
      tap(contacts => this.contacts = contacts),
      takeUntil(this.unsubscribe$)
    );
  }

  public changeSelect(index: number, contact: Contact) {
    this.selected = index;
    if (!contact.isRead) {
      this.contactService.isRead(contact.key);
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      let i = this.selected + 1;
      if (i > this.contacts.length - 1) { i = this.contacts.length - 1; }
      this.changeSelect(i, this.contacts[i]);
    } else if (event.key === 'ArrowUp') {
      let i = this.selected - 1;
      if (i < 0) { i = 0; }
      this.changeSelect(i, this.contacts[i]);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
