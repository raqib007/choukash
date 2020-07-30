import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OwnerInfoCreateFormComponent } from './owner-info-create-form/owner-info-create-form.component';
import { ContactService, DropdownListService, NotificationService } from 'src/app/_services';
import { Contact } from 'src/app/model';

@Component({
	selector: 'app-owner-information',
	templateUrl: './owner-information.component.html',
	styleUrls: ['./owner-information.component.scss']
})
export class OwnerInformationComponent implements OnInit {
	showAddress = false;
	fileData: File = null;
	previewUrl:any = null;

	addressList: Contact[];
	locationType = [];
	locationGroup = [];
	contactType = [];
	subContactType = [];
	country = [];

	constructor(
		private dialog: MatDialog,
		private contactService : ContactService,
		private dropdownService : DropdownListService,
		private notifyService : NotificationService
	) {
	}
	ngOnInit(): void {
		this.getOwnerInfo();
		this.getLocationType();
		this.getLocationGroup();
		this.getContactType();
		this.getContactGroup();
		this.getCountry();
	}
	getOwnerInfo(){
		this.contactService.getAllDefaultContact()
		.subscribe(
			res => {
				res = res.filter((item : any) => item.is_active == true && item.is_owner == true);
				this.addressList = res.map(l => new Contact(l));
			},
			err => {
				this.notifyService.showError(err, "Contact");
			},
			() => {
				if(this.addressList.length > 0){
					this.showAddress = true;
				}
			}
		);
	}
	/** get location type list **/
	getLocationType(){
        this.dropdownService.getLocationType()
		.subscribe(
			res => {
				this.locationType = res.map(l => {
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
				this.locationGroup = res.map(l => {
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
				this.contactType = res.map(l => {
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
				this.subContactType = res.map(l => {
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
	/** get country list **/
	getCountry(){
		this.dropdownService.getCountryList()
		.subscribe(
			res => {
				this.country = res.map(l => {
					let data = {
						code : l.alpha2Code,
						name : l.name
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



	onSelectFile(event) {
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = (event) => { 
				this.previewUrl = event.target.result;
			}
		  }
	}
  	onSubmit() {

	}
	createContact(){
		const pass_data = {
			addressList : this.addressList,
			locationType : this.locationType,
			locationGroup : this.locationGroup,
			contactType : this.contactType,
			subContactType : this.subContactType,
			countryList : this.country
		};
		this.dialog.open(OwnerInfoCreateFormComponent, { 
			panelClass: 'custom-dialog-container',
			data: pass_data,
			autoFocus : true,
			maxWidth : '100vw',
			width : '80vw'
		}).afterClosed().subscribe(
			val => {
				if(val != 'no'){
					this.notifyService.showSuccess("Owner's contact inforamtion has been successfully saved!!", "Owner's Information");
					// this.ngOnInit();
				}
			}
		);
	}
}
