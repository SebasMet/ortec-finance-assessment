import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactForm } from './contact-form';
import { ContactService } from '../../services/contact';

describe('ContactForm', () => {
  let component: ContactForm;
  let fixture: ComponentFixture<ContactForm>;
  let contactServiceSpy: jasmine.SpyObj<ContactService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ContactService', ['addContact']);

    await TestBed.configureTestingModule({
      imports: [ContactForm, ReactiveFormsModule],
      providers: [{ provide: ContactService, useValue: spy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactForm);
    component = fixture.componentInstance;
    contactServiceSpy = TestBed.inject(ContactService) as jasmine.SpyObj<ContactService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form with name and phone controls', () => {
    expect(component.contactForm.contains('name')).toBeTruthy();
    expect(component.contactForm.contains('phone')).toBeTruthy();
  });

  it('should require name to be at least 2 characters', () => {
    const nameControl = component.contactForm.get('name');
    nameControl?.setValue('A');
    expect(nameControl?.valid).toBeFalsy();
    nameControl?.setValue('AB');
    expect(nameControl?.valid).toBeTruthy();
  });

  it('should require phone to be exactly 10 digits', () => {
    const phoneControl = component.contactForm.get('phone');
    phoneControl?.setValue('123456789');
    expect(phoneControl?.valid).toBeFalsy();
    phoneControl?.setValue('1234567890');
    expect(phoneControl?.valid).toBeTruthy();
    phoneControl?.setValue('123456789a');
    expect(phoneControl?.valid).toBeFalsy();
  });

  it('should enable submit button only when form is valid', () => {
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTruthy();

    component.contactForm.setValue({ name: 'John', phone: '1234567890' });
    fixture.detectChanges();
    expect(button.disabled).toBeFalsy();
  });

  it('should call addContact and reset form on submit when valid', () => {
    component.contactForm.setValue({ name: 'John', phone: '1234567890' });
    component.onSubmit();
    expect(contactServiceSpy.addContact).toHaveBeenCalledWith({ name: 'John', phone: '1234567890' });
    expect(component.contactForm.value).toEqual({ name: '', phone: '' });
  });

  it('should not call addContact on submit when invalid', () => {
    component.contactForm.setValue({ name: 'A', phone: '123' });
    component.onSubmit();
    expect(contactServiceSpy.addContact).not.toHaveBeenCalled();
  });
});
