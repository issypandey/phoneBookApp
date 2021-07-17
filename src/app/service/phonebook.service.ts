import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ContactModel } from '../models/contact.model';

@Injectable({
    providedIn: 'root'
})
export class PhonebookService {

    phonebookUrl = 'https://localhost:44355/PhoneBook'

    constructor(private http: HttpClient) { }

    getPhonebookContacts(): Observable<any> {
        return this.http.get(this.phonebookUrl);
    }

    addContact(model: ContactModel) {
        return this.http.post(this.phonebookUrl, model).subscribe(
            (val) => {
                console.log("POST call successful value returned in body",
                    val);
            },
            response => {
                console.log("POST call in error", response);
            },
            () => {
                console.log("The POST observable is now completed.");
            });
    }
}
