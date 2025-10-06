import { Injectable, signal } from '@angular/core';

export interface Contact {
  id: string;
  name: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  readonly contacts = signal<Contact[]>([]);

  addContact(contact: Omit<Contact, 'id'>) {
    const newContact: Contact = {
      id: crypto.randomUUID(),
      ...contact
    };
    this.contacts.update(contacts => [...contacts, newContact]);
  }

  deleteContact(id: string) {
    this.contacts.update(contacts => contacts.filter(contact => contact.id !== id));
  }
}
