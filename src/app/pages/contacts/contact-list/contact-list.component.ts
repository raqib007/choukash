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

import { ContactData } from '../../../dummy-data/contact';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'erp-contact-list',
	templateUrl: './contact-list.component.html',
	styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements List<Contact>, OnInit, OnDestroy {
	// disabled = false;
	// labelPosition = 1;
	// checked = false;
	// indeterminate = 3;

	searchKeyword = 'value';
	formData = {
		id: -1,
		contactType: '',
		subContactType: '',
		bname: '',
		jobTitle: '',
		fname: '',
		lname: '',
		ltype: '',
		locationName: '',
		address: '',
		city: '',
		zipCode: '',
		country: '',
		phone: '',
		mobile: '',
		email: '',
		description: ''
	};
	groupformData = {
		id: -1,
		contactType: '',
		name: ''
	};
	subject$: ReplaySubject<Contact[]> = new ReplaySubject<Contact[]>(1);
	data$: Observable<Contact[]>;
	contacts: Contact[];
	@Input()
	columns: ListColumn[] = [
		{ name: 'Checkbox', property: 'checkbox', visible: true },
		{ name: 'Contact Type', property: 'contactType', visible: true, isModelProperty: true },
		{ name: 'Sub Group', property: 'subContactType', visible: true, isModelProperty: true },
		{ name: 'Business Name', property: 'bname', visible: true, isModelProperty: true },
		{ name: 'Job Title', property: 'jobTitle', visible: false, isModelProperty: true },
		{ name: 'First Name', property: 'fname', visible: false, isModelProperty: true },
		{ name: 'Last Name', property: 'lname', visible: false, isModelProperty: true },
		{ name: 'Location Type', property: 'ltype', visible: true, isModelProperty: true },
		{ name: 'Location Group', property: 'locationName', visible: true, isModelProperty: true },
		{ name: 'Address', property: 'address', visible: true, isModelProperty: true },
		{ name: 'City', property: 'city', visible: true, isModelProperty: true },
		{ name: 'Zipcode', property: 'zipCode', visible: true, isModelProperty: true },
		{ name: 'Country', property: 'country', visible: true, isModelProperty: true },
		{ name: 'Phone', property: 'phone', visible: true, isModelProperty: true },
		{ name: 'Mobile', property: 'mobile', visible: true, isModelProperty: true },
		{ name: 'Email', property: 'email', visible: true, isModelProperty: true },
		{ name: 'Description', property: 'description', visible: true, isModelProperty: true },
		{ name: 'Actions', property: 'actions', visible: true },
	] as ListColumn[];

	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<Contact> | null;
	database: ListDatabase<Contact>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	selectedLocType = '';
	selectedLoc = '';
	selectedConType = '';
	selectedSubConType = '';

	locationType = [
		{id:1,value:'Customers'},
		{id:2,value:'Consignment Contact'},
		{id:3,value:'Branch Contact'},
		{id:4,value:'Vendor Contact'},
		{id:5,value:'Warehouse Contact'},
		{id:6,value:'Shipping Contact'},
		{id:7,value:'Head Office Contact'}
	];
	locationName = [
		{id:1,value:'Customers'},
		{id:2,value:'Consignment Contact'},
		{id:3,value:'Branch Contact'},
		{id:4,value:'Vendor Contact'},
		{id:5,value:'Warehouse Contact'},
		{id:6,value:'Shipping Contact'},
		{id:7,value:'Head Office Contact'}
	];
	contactType = [
		{id:1,value:'Customers'},
		{id:2,value:'Consignment Contact'},
		{id:3,value:'Branch Contact'},
		{id:4,value:'Vendor Contact'},
		{id:5,value:'Warehouse Contact'},
		{id:6,value:'Shipping Contact'},
		{id:7,value:'Head Office Contact'}
	];
	subContactType = [
		{id:1,value:'Retail'},
		{id:2,value:'Wholesale'},
		{id:3,value:'VIP'},
		{id:4,value:'Manager'},
		{id:5,value:'POS Operator'},
		{id:6,value:'Inventory Supervisor'},
		{id:7,value:'Delivery'},
		{id:8,value:'Suplier'},
		{id:9,value:'Consignments'},
		{id:10,value:'Warehouse Manager'},
		{id:11,value:'Picker'},
		{id:12,value:'Delivery'},
		{id:13,value:'Receiver'},
		{id:14,value:'Contact Person'},
		{id:15,value:'Accountant'},
		{id:16,value:'Inventory Manager'},
		{id:17,value:'Marketing Manager'},
		{id:18,value:'Delivery Fleet Manager'},
		{id:19,value:'Finance Manager'},
		{id:20,value:'Purchase Manager'},
		{id:21,value:'Sales Manager'},
		{id:22,value:'HR Manager'}
	];

	constructor(private dialog: MatDialog) {}
	
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
  
	ngOnInit() {
		this.contacts = ContactData.map(contact => new Contact(contact));
		this.subject$.next(this.contacts);
		this.data$ = this.subject$.asObservable();
		this.database = new ListDatabase<Contact>();
		this.data$.pipe(
			takeUntil(componentDestroyed(this)),
			filter<Contact[]>(Boolean)
		).subscribe((contacts) => {
			this.contacts = contacts;
			this.database.dataChange.next(contacts);
			this.resultsLength = contacts.length;
		});
		this.dataSource = new ListDataSource<Contact>(this.database, this.sort, this.paginator, this.columns);
	}

	createContact() { 
		this.dialog.open(ContactListCreateFormComponent, { 
			panelClass: 'custom-dialog-container',
			data: this.formData,
			autoFocus : true,
			maxWidth : '100vw',
			width : '60vw'
		}).afterClosed().subscribe((contact: Contact) => {
			if(contact) {
				this.contacts.unshift(new Contact(contact));
				this.subject$.next(this.contacts);
			}
		});
	} 
	
	updateContact(contact) {
		this.dialog.open(ContactListCreateFormComponent, {
			data: contact,
			autoFocus : true,
			maxWidth : '100vw',
			width : '60vw'
		}).afterClosed().subscribe(resp => {
		if (resp) {
			const index = this.contacts.findIndex((existingcontact) => existingcontact.id === resp.id);
			this.contacts[index] = new Contact(resp);
			this.subject$.next(this.contacts);
			}
		});
	}
	
	deleteContact(contact) {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: {id: contact.id, msg: 'Are you sure want to delete this record?'}
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
		this.contacts.splice(this.contacts.findIndex((existingcontact) => existingcontact.id === contact.id), 1);
		this.subject$.next(this.contacts);
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
