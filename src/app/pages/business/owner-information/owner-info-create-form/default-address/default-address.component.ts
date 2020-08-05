import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/model';
import { LocationTypeDialogComponent } from 'src/app/pages/dialog/location-type-dialog/location-type-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DropdownListService, NotificationService } from 'src/app/_services';
import { ContactSubgroupDialogComponent } from 'src/app/pages/dialog/contact-subgroup-dialog/contact-subgroup-dialog.component';
import { ContactTypeDialogComponent } from 'src/app/pages/dialog/contact-type-dialog/contact-type-dialog.component';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
	selector: 'owner-default-address',
	templateUrl: './default-address.component.html',
	styleUrls: ['./default-address.component.scss']
})
export class DefaultAddressComponent implements OnInit {
	@Input() dropdownList: any;

    formData : Contact;
    selectedItem = [];
	alignmentType = 1;

    constructor(
		private subDialog: MatDialog,
		private dropdownService : DropdownListService,
		private notifyService : NotificationService
	) {
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
		this.formData = this.dropdownList.addressList[0];
	}
	pussCheckedItem(index,value){
		this.selectedItem[index].checked = !this.selectedItem[index].checked;
		console.log(this.selectedItem);
	}
	changeAlingment(val){
		this.alignmentType = val;
	}

	/** get location type list **/
	getLocationType(){
        this.dropdownService.getLocationType()
		.subscribe(
			res => {
				this.dropdownList.locationType = res.map(l => {
					let data = {
						id : l.location_type_id,
						value : l.location_type_name
					};
					return data;
				});
			},
			err => {
				this.notifyService.showError(err, "User Group");
			},
			() => {
			}
		);
	}
	/** get location group list **/
	getLocationGroup(){
        this.dropdownService.getLocationGroup()
		.subscribe(
			res => {
				this.dropdownList.locationGroup = res.map(l => {
					let data = {
						id : l.location_group_id,
						value : l.location_group_name
					};
					return data;
				});
			},
			err => {
				this.notifyService.showError(err, "Location Group");
			},
			() => {
			}
		);
	}
	/** get contact type list **/
	getContactType(){
        this.dropdownService.getContactType()
		.subscribe(
			res => {
				this.dropdownList.contactType = res.map(l => {
					let data = {
						id : l.contact_type_id,
						value : l.contact_type_name
					};
					return data;
				});
			},
			err => {
				this.notifyService.showError(err, "User Group");
			},
			() => {
			}
		);
	}
	/** get contact group list **/
	getContactGroup(){
        this.dropdownService.getContactGroup()
		.subscribe(
			res => {
				this.dropdownList.subContactType = res.map(l => {
					let data = {
						id : l.contact_sub_group_id,
						value : l.contact_sub_group_name
					};
					return data;
				});
			},
			err => {
				this.notifyService.showError(err, "User Group");
			},
			() => {
			}
		);
	}
	addLocationType(){
		console.log('add location type');
		this.subDialog.open(LocationTypeDialogComponent, { 
			panelClass: 'custom-dialog-container',
			// data: pass_data,
			autoFocus : true,
			maxWidth : '100vw',
			width : '60vw'
		}).afterClosed().subscribe(
			val => {
				if(val != 'no'){
					this.getLocationType();
				}
			}
		);
	}
	addContactType(){
		this.subDialog.open(ContactTypeDialogComponent, { 
			panelClass: 'custom-dialog-container',
			autoFocus : true,
			maxWidth : '100vw',
			width : '60vw'
		}).afterClosed().subscribe(
			val => {
				if(val != 'no'){
					this.getContactType();
				}
			}
		);
	}
	addContactSubGroup(){
		this.subDialog.open(ContactSubgroupDialogComponent, { 
			panelClass: 'custom-dialog-container',
			autoFocus : true,
			maxWidth : '100vw',
			width : '60vw'
		}).afterClosed().subscribe(
			val => {
				if(val != 'no'){
					this.getContactGroup();
				}
			}
		);
	}
	checkInvoice(event:MatCheckboxChange){
		if(event.checked){
			this.dropdownList.addressList[1].open_address = this.dropdownList.addressList[0].open_address;
			this.dropdownList.addressList[1].zip = this.dropdownList.addressList[0].zip;
			this.dropdownList.addressList[1].city = this.dropdownList.addressList[0].city;
			this.dropdownList.addressList[1].country = this.dropdownList.addressList[0].country;
			this.dropdownList.addressList[1].telephone = this.dropdownList.addressList[0].telephone;
			this.dropdownList.addressList[1].mobile = this.dropdownList.addressList[0].mobile;
			this.dropdownList.addressList[1].email = this.dropdownList.addressList[0].email;
			this.dropdownList.addressList[1].website = this.dropdownList.addressList[0].website;
		}else{
			this.dropdownList.addressList[1].open_address = "";
			this.dropdownList.addressList[1].zip = "";
			this.dropdownList.addressList[1].city = "";
			this.dropdownList.addressList[1].country = "";
			this.dropdownList.addressList[1].telephone = "";
			this.dropdownList.addressList[1].mobile = "";
			this.dropdownList.addressList[1].email = "";
			this.dropdownList.addressList[1].website = "";
		}
	}
	checkShipping(event:MatCheckboxChange){
		if(event.checked){
			this.dropdownList.addressList[2].open_address = this.dropdownList.addressList[0].open_address;
			this.dropdownList.addressList[2].zip = this.dropdownList.addressList[0].zip;
			this.dropdownList.addressList[2].city = this.dropdownList.addressList[0].city;
			this.dropdownList.addressList[2].country = this.dropdownList.addressList[0].country;
			this.dropdownList.addressList[2].telephone = this.dropdownList.addressList[0].telephone;
			this.dropdownList.addressList[2].mobile = this.dropdownList.addressList[0].mobile;
			this.dropdownList.addressList[2].email = this.dropdownList.addressList[0].email;
			this.dropdownList.addressList[2].website = this.dropdownList.addressList[0].website;
		}else{
			this.dropdownList.addressList[2].open_address = "";
			this.dropdownList.addressList[2].zip = "";
			this.dropdownList.addressList[2].city = "";
			this.dropdownList.addressList[2].country = "";
			this.dropdownList.addressList[2].telephone = "";
			this.dropdownList.addressList[2].mobile = "";
			this.dropdownList.addressList[2].email = "";
			this.dropdownList.addressList[2].website = "";
		}
	}
}
