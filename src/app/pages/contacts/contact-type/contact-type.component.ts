import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SortablejsOptions } from 'ngx-sortablejs';
import { LocationService, NotificationService, ContactService } from 'src/app/_services';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ListColumn } from 'src/app/core/list/list-column.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { ContactTypeCreateFormComponent } from './contact-type-create-form/contact-type-create-form.component';
import { MatDialog } from '@angular/material/dialog';

export interface Contact{
	contact_type_id : string;
	contact_type_name : string;
	description : string;
	is_active : boolean;
}

@Component({
	selector: 'erp-contact-type',
	templateUrl: './contact-type.component.html',
	styleUrls: ['./contact-type.component.scss']
})

export class ContactTypeComponent implements OnInit {

	allContactList = [];
	activeContactList = [];
	groupOptions: SortablejsOptions = {
		group: 'testGroup',
		handle: '.drag-handle',
		animation: 300
	};

	pageSize = 5;
	contacts: Contact[];
	// formData = {} as Contact;
	formData = {
		contact_type_id : '',
		contact_type_name : '',
		description : '',
		is_active : false
	};
	allSelected = false;
	selection = new SelectionModel<Contact>(true, []);
	dataSource = new MatTableDataSource<Contact>(this.contacts);

	@Input()
	columns: ListColumn[] = [
		{ name: 'Checkbox', property: 'is_active', visible: true,width:'10%' },
		{ name: 'Contact Type', property: 'contact_type_name', visible: true, isModelProperty: true, width:'40%' },
		{ name: 'Description', property: 'description', visible: true, isModelProperty: true, width:'40%' },
		{ name: 'Actions', property: 'actions', visible: true },
	] as ListColumn[];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private dialog: MatDialog,
		private contactService: ContactService,
		private notifyService: NotificationService,
	) { 
		console.log(this.formData);
	}
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
	ngOnInit(): void {
		this.contactService.getAllContactType()
		.subscribe(
			res => {
				this.contacts = res.map(m => {
					return {
						contact_type_id : m.contact_type_id,
						contact_type_name : m.contact_type_name,
						description : m.description,
						is_active : m.is_active
					}
				});
			},
			err => {
				this.notifyService.showError(err, "Contact Type");
			},
			() => {
				this.dataSource = new MatTableDataSource<Contact>(this.contacts);
				this.dataSource.paginator = this.paginator;
			}
		);
	}
	/* Add and Edit Funtion For Contact Group */
	editContact(contact){
		this.dialog.open(ContactTypeCreateFormComponent, { 
			panelClass: 'custom-dialog-container',
			data: contact,
			autoFocus : true,
			maxWidth : '100vw',
			width : '50vw'
		}).afterClosed().subscribe(
			val => {
				if(val == 'no'){

				}else{
					if(contact.contact_sub_group_id == ''){
						this.notifyService.showSuccess("Contact type data has been successfully saved!!", "Contact Type");
					}else{
						this.notifyService.showSuccess("Contact type data has been successfully updated!!", "Contact Type");
					}
					this.ngOnInit();
				}
			}
		);
	}
	/* Delete Funtion For Contact Group */
	deleteContact(row){
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: {id: row.contact_sub_group_id, msg: 'Are you sure want to delete this record?'}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result == 'yes'){
				this.contactService.deleteContactType(row.contact_type_id).subscribe((res : any) =>{
					if(res.code == 200){
						this.notifyService.showSuccess("Contact type data has been successfully deleted!!", "Contact Type");
						this.ngOnInit();
					}else{
						this.notifyService.showError(res.message, "Contact Type");
					}
				});
			}
		});
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
		// this.dataSource.data.forEach(row => this.selection.select(row));
		this.dataSource.data.forEach(row => this.selection.select(row));
	}
	/** Set active all selected rows. */
	setActive() {
		this.dataSource.data.forEach(row => {
			console.log('name = '+row.contact_type_name+" checked = ",row.is_active);
		});
	}
	onFilterChange(value) {
		if (!this.dataSource) {
			return;
		}
		this.dataSource.filter = value;
	}
}
