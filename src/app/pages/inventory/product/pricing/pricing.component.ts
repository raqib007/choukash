import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
	name: string;
	position: string;
	weight: string;
	symbol: string;
	ucost: string;
	tcost: string;
	details: string;
}
  
const ELEMENT_DATA: PeriodicElement[] = [
	{position: '', name: '', weight: '', symbol: '', ucost: '', tcost: '', details: ''},
	{position: '', name: '', weight: '', symbol: '', ucost: '', tcost: '', details: ''},
	{position: '', name: '', weight: '', symbol: '', ucost: '', tcost: '', details: ''},
	{position: '', name: '', weight: '', symbol: '', ucost: '', tcost: '', details: ''}
];

@Component({
	selector: 'inventory-product-pricing',
	templateUrl: './pricing.component.html',
	styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
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
	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'ucost', 'tcost', 'details'];
	dataSource = ELEMENT_DATA;
	  
	constructor(
	) {
		
	}
  
	ngOnInit() {
	}
}
