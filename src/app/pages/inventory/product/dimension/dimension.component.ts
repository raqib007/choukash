import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'inventory-product-dimension',
	templateUrl: './dimension.component.html',
	styleUrls: ['./dimension.component.scss']
})
export class DimensionComponent implements OnInit {
	unitList = [{id:1,name:'Kg'},{id:2,name:'Each'},{id:3,name:'Liter'},{id:4,name:'Bottle'},{id:5,name:'Gram'}];
	sizeList = [
		{id:1,length:'',width:'',height:'',uom:0}
	];	
	weightList = [{id:1,weight:'',uom:0}];	
	
	constructor() { }
	
	ngOnInit() {
	}
	addHeight() {
		let lastNumber = this.sizeList.length+1;
		this.sizeList.push({id:lastNumber,length:'',width:'',height:'',uom:0});
	}
	addWeight() {
		let lastWNumber = this.weightList.length+1;
		this.weightList.push({id:lastWNumber,weight:'',uom:0});
	}
	removeHeight(index) {
		this.sizeList.splice(this.sizeList.length-1, 1);
	}
	removeWeight(index) {
		this.weightList.splice(this.sizeList.length-1, 1);
	}
  
}