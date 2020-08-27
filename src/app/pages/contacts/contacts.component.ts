import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'erp-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
	selectedIndex = 3;
	constructor() { }

	ngOnInit(): void {
	}

}
