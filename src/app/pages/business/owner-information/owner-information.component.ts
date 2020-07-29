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
	showAddress = true;
	fileData: File = null;
	previewUrl:any = null;

	contacts: Contact[];
	locationType = [];
	locationGroup = [];
	contactType = [];
	subContactType = [];
	country = [];

	addressList = [];

	constructor(
		private dialog: MatDialog,
		private contactService : ContactService,
		private dropdownService : DropdownListService,
		private notifyService : NotificationService
	) {
	}
	ngOnInit(): void {
		this.getLocationType();
		this.getLocationGroup();
		this.getContactType();
		this.getContactGroup();
		this.getCountry();

		this.contactService.getAllDefaultContact()
		.subscribe(
			res => {
				res = res.filter((item : any) => item.is_active == true);
				this.contacts = res.map(l => new Contact(l));
			},
			err => {
				this.notifyService.showError(err, "Contact Sub Group");
			},
			() => {
				if(this.contacts.length > 0){
					this.addressList.push(this.contacts[0]);
				}
				console.log(this.addressList);
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
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;
		dialogConfig.maxWidth = '100vw';
		dialogConfig.width = '60vw';
		const dialogRef = this.dialog.open(OwnerInfoCreateFormComponent,dialogConfig);
        dialogRef.afterClosed().subscribe(
            val => console.log("Dialog output:", val)
		);
	}
}
