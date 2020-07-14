import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'ngx-sortablejs';

@Component({
	selector: 'inventory-product-locations',
	templateUrl: './locations.component.html',
	styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
	formData = {
		id:0,
		location: '',
	};
	locationGroup = [
		{id:1,name:'Head Office'},
		{id:2,name:'Branch'},
		{id:3,name:'Consignment'},
		{id:4,name:'Warehouse'},
		{id:5,name:'In Transit'},
		{id:6,name:'Shipping'},
		{id:7,name:'Vendor (VMI)'}
	];
	locationtList = [
		{id:1,value:'HMPTD'},
		{id:2,value:'HILLS'},
		{id:3,value:'RCHMD'}
	];
	assignLocationList = [
		{id:4,value:'LNGISND'},
		{id:5,value:'MNHTN'},
		{id:5,value:'QUNS'},
		{id:5,value:'BRKLN'},
		{id:5,value:'JMCA'}
	];
	groupOptions: SortablejsOptions = {
		group: 'testGroup',
		handle: '.drag-handle',
		animation: 300
	};
	constructor(
	) { }
  
	ngOnInit() {
	}
}
