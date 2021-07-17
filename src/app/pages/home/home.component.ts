import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ContactModel } from 'src/app/models/contact.model';
import { PhonebookService } from 'src/app/service/phonebook.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search: string = '';
  contacts: ContactModel[] = [];
  filteredContacts: ContactModel[] = [];
  mobNumberPattern = "^((\\+27-?)|0)?[0-9]{9}$";  
  contact = new FormGroup({
    name: new FormControl('', Validators.required),
    number: new FormControl('', [Validators.required, Validators.pattern(this.mobNumberPattern)])
  });

  constructor(private phonebook: PhonebookService) {
    // Initialization inside the constructor
  }

  ngOnInit() {
    this.phonebook.getPhonebookContacts().subscribe(
      (response) => {
        this.contacts = response.entries; 
        this.filteredContacts = this.contacts;
      },
      (error) => {
        console.error('Request failed with error')
      });
  }

  public filter() {
    const filterValue = this.search.toLowerCase();
    this.filteredContacts = this.contacts.filter(option =>
      (option.name.toLowerCase().includes(filterValue))
      || (option.number.toLowerCase().includes(filterValue)));
  }

  addContact() {
    this.phonebook.addContact(this.contact.value);
    this.contacts.push(this.contact.value);
    this.contact.reset();
    this.contact.markAsUntouched();
  }
}
