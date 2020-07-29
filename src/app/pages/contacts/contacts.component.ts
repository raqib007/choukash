import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'erp-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
	selectedIndex = 0;
	constructor() { }

	ngOnInit(): void {
	}

}
