import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ROUTE_TRANSITION } from '../../../app.animation';

@Component({
	selector: 'inventory-product',
  	templateUrl: './product.component.html',
  	styleUrls: ['./product.component.scss'],
	animations: [...ROUTE_TRANSITION],
	host: { '[@routeTransition]': '' }
})
export class ProductComponent implements OnInit, AfterContentInit {
	seletedIndex = 2;
	constructor() { }
	sidebarList = [];
	subHeaderName = "Settings/Business";

	ngOnInit() {
		this.sidebarList = [
			{id:0,name:'General',pageName:'<inventory-product-general></inventory-product-general>'},
			{id:1,name:'Unit of Measurement',pageName:'<inventory-product-uom></inventory-product-uom>'},
			{id:2,name:'Product Variant',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:3,name:'Dimensions',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:4,name:'Locations',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:5,name:'Vendor Informations',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:6,name:'Replenishment',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:7,name:'Costing',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:8,name:'Price Management',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:9,name:'Accounts',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:10,name:'ABC Analysis',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:11,name:'Stock Quantity Check',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:12,name:'Add Initial Inventory',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:13,name:'Move Inventory',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:14,name:'Cycle Count/ Adjust',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:15,name:'Scrap Inventory',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:16,name:'Display Management',pageName:'<inventory-product-variant></inventory-product-variant>'},
			// {id:17,name:'Move Inventory',pageName:'<inventory-product-variant></inventory-product-variant>'}
		];
	}

	ngAfterContentInit() {
	}

	scrollTo(elem) {
		elem.scrollIntoView({
			behavior: 'smooth', 
			block: 'start',
			inline: 'nearest'
		});
	}

	changeItem(index){
		this.seletedIndex = index.id;
		this.subHeaderName = "/"+index.name;
	}
}