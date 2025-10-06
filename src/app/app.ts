import { Component } from '@angular/core';
import { ContactForm } from './components/contact-form/contact-form';
import { ContactList } from './components/contact-list/contact-list';

@Component({
  selector: 'app-root',
  imports: [ContactForm, ContactList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ortec-finance-assessment';

}
