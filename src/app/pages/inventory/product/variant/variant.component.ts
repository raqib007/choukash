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
		{id:1,name:'Size',values:'Small,Large,Medium'}
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
		this.attributeLists.push({id:lastNumber,name:'',values:''});
	}
	removeAttributes(index) {
		this.attributeLists.splice(this.attributeLists.length-1, 1);
	}
  
}