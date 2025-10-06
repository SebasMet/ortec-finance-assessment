import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Contact {
  id: string;
  name: string;
  phone: string;
  joke: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);

  readonly contacts = signal<Contact[]>([]);

  addContact(contact: Omit<Contact, 'id' | 'joke'>) {
    const newContact: Contact = {
      ...contact,
      id: crypto.randomUUID(),
      joke: 'Loading joke...'
    };

    this.contacts.update(contacts => [...contacts, newContact]);

    this.http.get<{ value: string }>('https://api.chucknorris.io/jokes/random')
      .subscribe({
        next: (response) => this.updateContactJoke(newContact.id, response.value),
        error: (error) => {
          console.error('Failed to fetch joke:', error);
          this.updateContactJoke(newContact.id, 'Joke unavailable');
        }
      });
  }

  private updateContactJoke(id: string, joke: string) {
    this.contacts.update(contacts =>
      contacts.map(contact => contact.id === id ? { ...contact, joke } : contact)
    );
  }

  deleteContact(id: string) {
    this.contacts.update(contacts =>
      contacts.filter(contact => contact.id !== id)
    );
  }
}