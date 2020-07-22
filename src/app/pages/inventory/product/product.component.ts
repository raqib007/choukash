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
	seletedIndex = 0;
	constructor() { }
	sidebarList = [];
	subHeaderName = "General";

	ngOnInit() {
		this.sidebarList = [
			{id:0,name:'General',pageName:'<inventory-product-general></inventory-product-general>'},
			{id:1,name:'Unit of Measurement',pageName:'<inventory-product-uom></inventory-product-uom>'},
			{id:2,name:'Product Variant',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:3,name:'Dimensions',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:4,name:'Locations',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:5,name:'Vendor Informations',pageName:'<inventory-product-variant></inventory-product-variant>'},
			{id:6,name:'Replenishment',pageName:'<inventory-product-replenishment></inventory-product-replenishment>'},
			{id:7,name:'Costing',pageName:'<inventory-product-replenishment></inventory-product-replenishment>'},
			{id:8,name:'Pricing',pageName:'<inventory-product-replenishment></inventory-product-replenishment>'},
			{id:9,name:'Accounts',pageName:'<inventory-product-replenishment></inventory-product-replenishment>'},
			{id:10,name:'Stock Quantity Check',pageName:'<inventory-product-replenishment></inventory-product-replenishment>'},
			{id:11,name:'Add Initial Inventory',pageName:'<inventory-product-replenishment></inventory-product-replenishment>'},
			{id:12,name:'Move Inventory',pageName:'<inventory-product-replenishment></inventory-product-replenishment>'},
			{id:13,name:'Cycle Count/ Adjust',pageName:'<inventory-product-replenishment></inventory-product-replenishment>'},
			{id:14,name:'Scrap Inventory',pageName:'<inventory-product-replenishment></inventory-product-replenishment>'},
			{id:15,name:'Display Management',pageName:'<inventory-product-replenishment></inventory-product-replenishment>'},
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
		this.subHeaderName = index.name;
	}
}