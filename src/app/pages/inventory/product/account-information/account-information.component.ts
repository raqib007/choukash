import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'inventory-product-account',
	templateUrl: './account-information.component.html',
	styleUrls: ['./account-information.component.scss']
})
export class AccountInformationComponent implements OnInit {
	formData = {
		id:0,
		location: '',
	};
	locationGroup = [
		{id:1,name:'Standard Cost'},
		{id:2,name:'FIFO Cost'},
		{id:3,name:'Last Purchased Cost'},
		{id:4,name:'Average Cost'}
	];
	unitList = ['Kg','Each','Liter','Bottle','Gram'];
	
	constructor(
	) {
		
	}
  
	ngOnInit() {
	}
}
