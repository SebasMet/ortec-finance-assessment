import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { ContactService } from './contact';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add contact and fetch joke', () => {
    const contactData = { name: 'John', phone: '1234567890' };
    service.addContact(contactData);

    const req = httpMock.expectOne('https://api.chucknorris.io/jokes/random');
    expect(req.request.method).toBe('GET');
    req.flush({ value: 'Test joke' });

    const contacts = service.contacts();
    expect(contacts.length).toBe(1);
    expect(contacts[0].name).toBe('John');
    expect(contacts[0].phone).toBe('1234567890');
    expect(contacts[0].joke).toBe('Test joke');
    expect(contacts[0].id).toBeTruthy();
  });

  it('should delete contact', () => {
    service.contacts.set([{ id: '1', name: 'John', phone: '123', joke: 'joke' }]);
    service.deleteContact('1');
    expect(service.contacts().length).toBe(0);
  });
});
