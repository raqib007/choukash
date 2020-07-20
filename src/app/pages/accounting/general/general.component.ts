import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'accounting-general',
	templateUrl: './general.component.html',
	styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
	unitList = ['Kg'];
	dateFormat = [
		{id:1,value:'MM/dd/yyyy'},
		{id:2,value:'dd/MM/yyyy'},
		{id:3,value:'dd-MM-yyyy'},
		{id:4,value:'yyyy-MM-dd'},
		{id:5,value:'yyyy/MM/dd'},
		{id:6,value:'MM-dd-yyyy'},
		{id:7,value:'dd.MM.yyyy'},
		{id:8,value:'MM.dd.yyyy'},
		{id:9,value:'yyyy.MM.dd'}
	];
	numberFormat = [
		{id:1,value:'123,456.00'},
		{id:2,value:'123.456,00'},
		{id:3,value:'123 456,00'},
		{id:4,value:'1,23,456.00'}
	];
	customerFormat = [
		{id:1,value:'Clients'},
		{id:2,value:'Customers'},
		{id:3,value:'Doners'},
		{id:4,value:'Guests'},
		{id:5,value:'Members'},
		{id:6,value:'Patients'},
		{id:7,value:'Tenants'}
	];
	formData = {
		fiscal : ''
	};
	constructor() { }

	ngOnInit(): void {
	}

}
