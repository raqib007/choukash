import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'inventory-product-add-initial-inventory',
    templateUrl: './add-initial-inventory.component.html',
    styleUrls: ['./add-initial-inventory.component.scss']
})
export class AddInitialInventoryComponent implements OnInit {
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
