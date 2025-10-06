import { Injectable, signal } from '@angular/core';

export interface Contact {
  name: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  readonly contacts = signal<Contact[]>([]);

  addContact(contact: Contact) {
    this.contacts.update(contacts => [...contacts, contact]);
  }
}
