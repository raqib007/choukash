import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
	product: string;
	code: string;
	note: string;
	uom: string;
	ucost: string;
}
  
const ELEMENT_DATA: PeriodicElement[] = [
	{product: '', code: '', note: '', uom: '', ucost: ''},
	{product: '', code: '', note: '', uom: '', ucost: ''},
	{product: '', code: '', note: '', uom: '', ucost: ''},
	{product: '', code: '', note: '', uom: '', ucost: ''}
];

@Component({
	selector: 'inventory-move-inventory',
	templateUrl: './move-inventory.component.html',
	styleUrls: ['./move-inventory.component.scss']
})
export class MoveInventoryComponent implements OnInit {
	displayedColumns: string[] = ['product', 'code', 'note', 'uom', 'ucost'];
	dataSource = ELEMENT_DATA;
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
