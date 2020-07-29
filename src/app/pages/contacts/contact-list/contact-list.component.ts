import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { List } from '../../../core/list/list.interface';
import { Contact } from '../../../model/contact';
import { ListColumn } from '../../../core/list/list-column.model';
import { ListDataSource } from '../../../core/list/list-datasource';
import { ListDatabase } from '../../../core/list/list-database';
import { componentDestroyed } from '../../../core/utils/component-destroyed';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, takeUntil,startWith, map } from 'rxjs/operators';
import { ContactListCreateFormComponent } from '../contact-list-create-form/contact-list-create-form.component';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { ContactSubGroupCreateFormComponent } from '../contact-sub-group-create-form/contact-sub-group-create-form.component';
import { ContactService, NotificationService, DropdownListService } from 'src/app/_services';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'erp-contact-list',
	templateUrl: './contact-list.component.html',
	styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
	// disabled = false;
	// labelPosition = 1;
	// checked = false;
	// indeterminate = 3;
	contacts: Contact[];
	searchKeyword = 'value';
	formData = {
		contact_id: '',
		address_type: '',
		contact_type_id: '',
		contact_type_name: '',
		contact_sub_group_id: '',
		contact_sub_group_name: '',
		first_name: '',
		last_name: '',
		business_name: '',
		job_title: '',
		location_type_id: '',
		location_type_name: '',
		location_group_id: '',
		location_group_name: '',
		open_address: '',
		zip: '',
		city: '',
		country: '',
		mobile: '',
		telephone: '',
		email: '',
		website: '',
		is_active: '',
		company_id: '',
		note: ''
	};
	groupformData = {
		id: -1,
		contactType: '',
		name: ''
	};
	
	@Input()
	columns: ListColumn[] = [
		{ name: 'Checkbox', property: 'checkbox', visible: true },
		{ name: 'Contact Type', property: 'contact_type_name', visible: true, isModelProperty: true },
		{ name: 'Sub Group', property: 'contact_sub_group_name', visible: true, isModelProperty: true },
		{ name: 'Business Name', property: 'business_name', visible: true, isModelProperty: true },
		{ name: 'Job Title', property: 'job_title', visible: false, isModelProperty: true },
		{ name: 'First Name', property: 'first_name', visible: false, isModelProperty: true },
		{ name: 'Last Name', property: 'last_name', visible: false, isModelProperty: true },
		{ name: 'Location Type', property: 'location_type_name', visible: true, isModelProperty: true },
		{ name: 'Location Group', property: 'location_group_name', visible: true, isModelProperty: true },
		{ name: 'Address', property: 'open_address', visible: true, isModelProperty: true },
		{ name: 'City', property: 'city', visible: true, isModelProperty: true },
		{ name: 'Zipcode', property: 'zip', visible: true, isModelProperty: true },
		{ name: 'Country', property: 'country', visible: true, isModelProperty: true },
		{ name: 'Phone', property: 'telephone', visible: true, isModelProperty: true },
		{ name: 'Mobile', property: 'mobile', visible: true, isModelProperty: true },
		{ name: 'Email', property: 'email', visible: true, isModelProperty: true },
		{ name: 'Description', property: 'note', visible: true, isModelProperty: true },
		{ name: 'Actions', property: 'actions', visible: true },
	] as ListColumn[];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	selectedLocType = '';
	selectedLoc = '';
	selectedConType = '';
	selectedSubConType = '';
	locationType = [];
	locationGroup = [];
	contactType = [];
	subContactType = [];
	country = [];
	allSelected = false;

	selection = new SelectionModel<Contact>(true, []);
	dataSource = new MatTableDataSource<Contact>(this.contacts);

	constructor(
		private dialog: MatDialog,
		private contactService : ContactService,
		private dropdownService : DropdownListService,
		private notifyService : NotificationService
	) {}
	
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
  
	ngOnInit() {
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
				this.dataSource = new MatTableDataSource<Contact>(this.contacts);
				this.dataSource.paginator = this.paginator;
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
	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}
	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.allSelected = !this.isAllSelected();
		this.isAllSelected() ?
		this.selection.clear() :
		this.dataSource.data.forEach(row => this.selection.select(row));
	}
	
	updateContact(contact) {
		// this.dialog.open(ContactListCreateFormComponent, {
		// 	data: contact,
		// 	autoFocus : true,
		// 	maxWidth : '100vw',
		// 	width : '60vw'
		// }).afterClosed().subscribe(resp => {
		// if (resp) {
		// 		const index = this.contacts.findIndex((existingcontact) => existingcontact.id === resp.id);
		// 		this.contacts[index] = new Contact(resp);
		// 		this.subject$.next(this.contacts);
		// 	}
		// });
		const pass_data = {
			contact : contact,
			locationType : this.locationType,
			locationGroup : this.locationGroup,
			contactType : this.contactType,
			subContactType : this.subContactType,
			country : this.country
		};
		console.log('pass data in list = ',pass_data);
		this.dialog.open(ContactListCreateFormComponent, { 
			panelClass: 'custom-dialog-container',
			// data: contact,
			data: pass_data,
			autoFocus : true,
			maxWidth : '100vw',
			width : '50vw'
		}).afterClosed().subscribe(
			val => {
				if(val == 'no'){

				}else{
					if(contact.contact_id == ''){
						this.notifyService.showSuccess("Contact data has been successfully saved!!", "Contact");
					}else{
						this.notifyService.showSuccess("Contact data has been successfully updated!!", "Contact");
					}
					this.ngOnInit();
				}
			}
		);
	}
	
	deleteContact(contact) {
		// const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
		// 	width: '250px',
		// 	data: {id: contact.id, msg: 'Are you sure want to delete this record?'}
		// });
		// dialogRef.afterClosed().subscribe(result => {
		// 	console.log('The dialog was closed');
		// });
		// this.contacts.splice(this.contacts.findIndex((existingcontact) => existingcontact.id === contact.id), 1);
		// this.subject$.next(this.contacts);

		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: {id: contact.contact_id, msg: 'Are you sure want to delete this record?'}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result == 'yes'){
				this.contactService.deleteContactGroup(contact.contact_id).subscribe((res : any) =>{
					if(res.code == 200){
						this.notifyService.showSuccess("Contact data has been successfully deleted!!", "Contact");
						this.ngOnInit();
					}else{
						this.notifyService.showError(res.message, "Contact");
					}
				});
			}
		});
	}
	
	onFilterChange(value) {
		if (!this.dataSource) {
			return;
		}
		this.dataSource.filter = value;
	}
	ngOnDestroy() {}

	selectEvent(item) {
		// do something with selected item
	}
	onChangeSearch(val: string) {
		// fetch remote data from here
		// And reassign the 'data' which is binded to 'data' property.
	}
	onFocused(e){
		// do something when input is focused
	}
	createContactSubGroup() { 
		this.dialog.open(ContactSubGroupCreateFormComponent, { 
			panelClass: 'custom-dialog-container',
			data: this.groupformData,
			autoFocus : true,
			maxWidth : '100vw',
			width : '60vw'
		}).afterClosed().subscribe((contact: Contact) => {
			// if(contact) {
			// 	this.contacts.unshift(new Contact(contact));
			// 	this.subject$.next(this.contacts);
			// }
		});
	}
}
