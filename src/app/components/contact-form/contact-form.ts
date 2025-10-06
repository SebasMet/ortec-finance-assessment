import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService} from '../../services/contact';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css'
})
export class ContactForm {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  public contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
  });

  public onSubmit() {
    if (this.contactForm.valid) {
      const formValue = this.contactForm.value;

      if (formValue.name && formValue.phone) {
        this.contactService.addContact({
          name: formValue.name,
          phone: formValue.phone
        });
        this.contactForm.reset({ name: '', phone: '' });
      }
    }
  }
}