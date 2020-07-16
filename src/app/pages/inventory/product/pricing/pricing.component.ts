import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
	product: string;
	code: string;
	note: string;
	uom: string;
	ucost: string;
	tcost: string;
	details: string;
	priceRule: string;
	startDate : string;
	endDate : string;
}
  
const ELEMENT_DATA: PeriodicElement[] = [
	{product: 'Shoe Oxford', code: '105002', note: 'Black 8', uom: 'Pair', ucost: '2000', tcost: '2500', details: '2400', priceRule: '2450', startDate: '05/15/20', endDate: '05/15/20'},
	{product: 'Shoe Oxford', code: '105002', note: 'Black 8', uom: 'Pair', ucost: '2000', tcost: '2500', details: '2400', priceRule: '2450', startDate: '05/15/20', endDate: '05/15/20'},
	{product: 'Shoe Oxford', code: '105002', note: 'Black 8', uom: 'Pair', ucost: '2000', tcost: '2500', details: '2400', priceRule: '2450', startDate: '05/15/20', endDate: '05/15/20'},
	{product: 'Shoe Oxford', code: '105002', note: 'Black 8', uom: 'Pair', ucost: '2000', tcost: '2500', details: '2400', priceRule: '2450', startDate: '05/15/20', endDate: '05/15/20'}
];

@Component({
	selector: 'inventory-product-pricing',
	templateUrl: './pricing.component.html',
	styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
	showCalculator = false;
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
	displayedColumns: string[] = ['product', 'code', 'note', 'uom', 'ucost', 'tcost', 'details', 'priceRule', 'startDate', 'endDate'];
	dataSource = ELEMENT_DATA;
	  
	constructor(
	) {
		
	}
  
	ngOnInit() {
	}

	showPriceCalculator(){
		this.showCalculator = true;
	}
}
