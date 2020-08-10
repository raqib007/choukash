import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/model';
import { MatDialog } from '@angular/material/dialog';
import { DropdownListService, NotificationService } from 'src/app/_services';
import { LocationTypeDialogComponent } from 'src/app/pages/dialog/location-type-dialog/location-type-dialog.component';
import { ContactTypeDialogComponent } from 'src/app/pages/dialog/contact-type-dialog/contact-type-dialog.component';
import { ContactSubgroupDialogComponent } from 'src/app/pages/dialog/contact-subgroup-dialog/contact-subgroup-dialog.component';

@Component({
	selector: 'owner-invoice-address',
	templateUrl: './invoice-address.component.html',
	styleUrls: ['./invoice-address.component.scss']
})
export class InvoiceAddressComponent implements OnInit {
	@Input() dropdownListInvoice: any;
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
			{checked:false,value:"business_name"},
			{checked:false,value:"job_title"},
			{checked:false,value:"first_name"},
			{checked:false,value:"last_name"},
			{checked:false,value:"location_group_name"},
			{checked:false,value:"open_address"},
			{checked:false,value:"zip"},
			{checked:false,value:"city"},
			{checked:false,value:"country"},
			{checked:false,value:"telephone"},
			{checked:false,value:"mobile"},
			{checked:false,value:"email"},
			{checked:false,value:"website"},
			{checked:false,value:"contact_type_name"},
			{checked:false,value:"contact_sub_group_name"}
		];
    }
    ngOnInit(): void {
		this.formData = this.dropdownListInvoice.addressList[1];
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
				this.dropdownListInvoice.locationType = res.map(l => {
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
				this.dropdownListInvoice.locationGroup = res.map(l => {
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
				this.dropdownListInvoice.contactType = res.map(l => {
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
				this.dropdownListInvoice.subContactType = res.map(l => {
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
}
