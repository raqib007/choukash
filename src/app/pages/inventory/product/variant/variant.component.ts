import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
    selector: 'inventory-product-variant',
    templateUrl: './variant.component.html',
    styleUrls: ['./variant.component.scss']
})
export class VariantComponent implements OnInit {
	selectedIndex = 0;
	base = 'Each';
	unitList = ['Kg','Each','Liter','Bottle','Gram'];
	sizes = [{id:1,name:'Small'},{id:2,name:'Medium'},{id:3,name:'Large'}];
	colors = [{id:1,name:'Green'},{id:2,name:'Red'},{id:3,name:'Grey'}];
	attributeLists = [
		{
			id:1,
			name:'Attribute Name 1',
			size:[
				{ id: 1, name: 'Small'},
				{ id: 3, name: 'Large'}
			],
			values:'1,2,3'},
		{id:2,name:'Attribute Name 2',size:[],values:'1,2,3'},
		{id:3,name:'Attribute Name 3',size:[],values:'1,2,3'}
	];
	dropdownList = [];
	selectedItems = [];
  	dropdownSettings:IDropdownSettings;
	constructor() { }
	ngOnInit() {
		this.dropdownSettings = {
			singleSelection: false,
			idField: 'id',
			textField: 'name',
			selectAllText: 'All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 2,
			// allowSearchFilter: true
		};
	}
	addAttributes() {
		let lastNumber = this.attributeLists.length+1;
		this.attributeLists.push({id:lastNumber,name:'Attribute Name '+lastNumber,size:[],values:''});
	}
	removeAttributes(index) {
		this.attributeLists.splice(this.attributeLists.length-1, 1);
	}
  
}