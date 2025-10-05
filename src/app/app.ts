import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactForm } from './components/contact-form/contact-form';

@Component({
  selector: 'app-root',
  imports: [ContactForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ortec-finance-assessment';
}
