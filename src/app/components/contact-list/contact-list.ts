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

  public isFibonacci(n: number): boolean {
    const isPerfectSquare = (x: number): boolean => {
      const s = Math.sqrt(x);
      return s === Math.floor(s);
    };
    return isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4);
  }
}
