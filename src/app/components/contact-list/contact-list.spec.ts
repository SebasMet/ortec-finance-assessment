import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ContactList } from './contact-list';
import { ContactService, Contact } from '../../services/contact';

describe('ContactList', () => {
  let component: ContactList;
  let fixture: ComponentFixture<ContactList>;
  let contactServiceSpy: jasmine.SpyObj<ContactService>;
  let contactsSignal: any;

  beforeEach(async () => {
    contactsSignal = signal<Contact[]>([]);
    contactServiceSpy = jasmine.createSpyObj('ContactService', ['deleteContact'], {
      contacts: contactsSignal
    });

    await TestBed.configureTestingModule({
      imports: [ContactList],
      providers: [
        { provide: ContactService, useValue: contactServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display contacts', () => {
    const testContacts: Contact[] = [
      { id: '1', name: 'John', phone: '123', joke: 'joke1' },
      { id: '2', name: 'Jane', phone: '456', joke: 'joke2' }
    ];
    contactsSignal.set(testContacts);
    fixture.detectChanges();

    const contactItems = fixture.nativeElement.querySelectorAll('.contact-item');
    expect(contactItems.length).toBe(2);
    expect(contactItems[0].textContent).toContain('John - 123 - joke1');
    expect(contactItems[1].textContent).toContain('Jane - 456 - joke2');
  });

  it('should call deleteContact on button click', () => {
    const testContacts: Contact[] = [
      { id: '1', name: 'John', phone: '123', joke: 'joke' }
    ];
    contactsSignal.set(testContacts);
    fixture.detectChanges();

    const deleteButton = fixture.nativeElement.querySelector('button');
    deleteButton.click();

    expect(contactServiceSpy.deleteContact).toHaveBeenCalledWith('1');
  });

  it('should highlight fibonacci indices', () => {
    const testContacts: Contact[] = [
      { id: '1', name: 'A', phone: '1', joke: 'j' },
      { id: '2', name: 'B', phone: '2', joke: 'j' },
      { id: '3', name: 'C', phone: '3', joke: 'j' },
      { id: '4', name: 'D', phone: '4', joke: 'j' },
      { id: '5', name: 'E', phone: '5', joke: 'j' }
    ]; 
    contactsSignal.set(testContacts);
    fixture.detectChanges();

    const contactItems = fixture.nativeElement.querySelectorAll('.contact-item');
    expect(contactItems[0].classList).toContain('fibonacci'); 
    expect(contactItems[1].classList).toContain('fibonacci'); 
    expect(contactItems[2].classList).toContain('fibonacci'); 
    expect(contactItems[3].classList).toContain('fibonacci'); 
    expect(contactItems[4].classList).not.toContain('fibonacci');
  });

  it('should show no contacts message when empty', () => {
    contactsSignal.set([]);
    fixture.detectChanges();

    const noContacts = fixture.nativeElement.querySelector('.no-contacts');
    expect(noContacts).toBeTruthy();
    expect(noContacts.textContent).toContain('No contacts added yet');
  });
});
