import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact';

@Component({
  selector: 'app-contact-list',
  imports: [CommonModule],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactList {
  private contactService = inject(ContactService);
  protected contacts = this.contactService.contacts;

  public deleteContact(id: string) {
    this.contactService.deleteContact(id);
  }
}
