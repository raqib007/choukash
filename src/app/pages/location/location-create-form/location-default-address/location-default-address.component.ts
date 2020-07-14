import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-default-address',
  templateUrl: './location-default-address.component.html',
  styleUrls: ['./location-default-address.component.scss']
})
export class LocationDefaultAddressComponent implements OnInit {
    formData = {
		bname: '',
		authority: '',
		fname: '',
		lname: '',
		lgroup: '',
		address: '',
		zip: '',
		city: '',
		country: '',
		phone: '',
		mobile: '',
		email: '',
		website: '',
		ctype: '',
		cstype: '',
	};
    selectedItem = [];
    locations = ['Head Office','Branch','Consignment','Warehouse','In Transit','Shipping','Vendor (VMI)'];
	country = ['USA','Bangladesh'];
	serverName = 'TestServer';
	alignmentType = 1;
    constructor() {
		this.locations.push('USA');
		this.locations.push('Dhaka');
		this.selectedItem = [
			{checked:true,value:"Gononet LLC"},
			{checked:false,value:"bname"},
			{checked:false,value:"authority"},
			{checked:false,value:"fname"},
			{checked:false,value:"lname"},
			{checked:false,value:"lgroup"},
			{checked:false,value:"address"},
			{checked:false,value:"zip"},
			{checked:false,value:"city"},
			{checked:false,value:"country"},
			{checked:false,value:"phone"},
			{checked:false,value:"mobile"},
			{checked:false,value:"email"},
			{checked:false,value:"website"},
			{checked:false,value:"ctype"},
			{checked:false,value:"cstype"}
		];
    }
    ngOnInit(): void {

	}
	pussCheckedItem(index,value){
		this.selectedItem[index].checked = !this.selectedItem[index].checked;
		console.log(this.selectedItem);
	}
	changeAlingment(val){
		this.alignmentType = val;
	}
}
