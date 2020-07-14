import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'product-vendor-information',
	templateUrl: './vendor-information.component.html',
	styleUrls: ['./vendor-information.component.scss']
})
export class VendorInformationComponent implements OnInit {
	formData = {
		id:0,
		location: '',
		bname: '',
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
	vendorList = [
		{
			id:1,
			vendor:'',
			part:'',
			leadTime:'',
			cost:'',
			unit:'',
			purchaseDate:''
		}
	];
	constructor(
	) { }
  
	ngOnInit() {
	}
	addVendor(){
		this.vendorList.push({
			id:this.vendorList.length+1,
			vendor:'',
			part:'',
			leadTime:'',
			cost:'',
			unit:'',
			purchaseDate:''
		});
	}
	removeVendor(){
		this.vendorList.splice(this.vendorList.length-1, 1);
	}
}

