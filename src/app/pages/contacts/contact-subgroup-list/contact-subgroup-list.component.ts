import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { List } from '../../../core/list/list.interface';
import { ContactGroup } from '../../../model/contact-group';
import { ListColumn } from '../../../core/list/list-column.model';
import { ListDataSource } from '../../../core/list/list-datasource';
import { ListDatabase } from '../../../core/list/list-database';
import { componentDestroyed } from '../../../core/utils/component-destroyed';
import { filter, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ContactGroupData } from '../../../dummy-data/contact-subgroup';
import { ContactSubGroupCreateFormComponent } from '../contact-sub-group-create-form/contact-sub-group-create-form.component';
import { ContactManagmentFormComponent} from '../contact-managment-form/contact-managment-form.component';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
	selector: 'erp-contact-subgroup-list',
	templateUrl: './contact-subgroup-list.component.html',
	styleUrls: ['./contact-subgroup-list.component.scss']
})
export class ContactSubgroupListComponent implements List<ContactGroup>, OnInit, OnDestroy {

	subject$: ReplaySubject<ContactGroup[]> = new ReplaySubject<ContactGroup[]>(1);
	data$: Observable<ContactGroup[]>;
	contacts: ContactGroup[];

	formData = {
		id : -1,
		contactType : '',
		name : ''
	};

	@Input()
	columns: ListColumn[] = [
		{ name: 'ID', property: 'id', visible: true, isModelProperty: true,width:'10%' },
		{ name: 'Sub Group Name', property: 'name', visible: true, isModelProperty: true ,width:'40%'},
		{ name: 'Contact Type', property: 'contactType', visible: true, isModelProperty: true ,width:'40%'},
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];

	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<ContactGroup> | null;
	database: ListDatabase<ContactGroup>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private dialog: MatDialog) {}
	
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
  
	ngOnInit() {
		console.log(ContactGroupData);
		this.contacts = ContactGroupData.map(l => new ContactGroup(l));
		this.subject$.next(this.contacts);
		this.data$ = this.subject$.asObservable();
		this.database = new ListDatabase<ContactGroup>();
		this.data$.pipe(
			takeUntil(componentDestroyed(this)),
			filter<ContactGroup[]>(Boolean)
		).subscribe((contactGroup) => {
			this.contacts = contactGroup;
			this.database.dataChange.next(contactGroup);
			this.resultsLength = contactGroup.length;
		});
		this.dataSource = new ListDataSource<ContactGroup>(this.database, this.sort, this.paginator, this.columns);
	}
	
	/* Add and Edit Funtion For Contact Group */
	editGroup(contact){
		this.dialog.open(ContactSubGroupCreateFormComponent, { 
			panelClass: 'custom-dialog-container',
			data: contact,
			autoFocus : true,
			maxWidth : '100vw',
			width : '50vw'
		}).afterClosed().subscribe((contact: ContactGroup) => {
			if(contact) {
				this.contacts.unshift(new ContactGroup(contact));
				this.subject$.next(this.contacts);
			}
		});
	}
	/* Delete Funtion For Contact Group */
	deleteGroup(row){
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: {id: row.id, msg: 'Are you sure want to delete this record?'}
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}
	manageContact(){
		this.dialog.open(ContactManagmentFormComponent, { 
			panelClass: 'custom-dialog-container',
			// data: contact,
			autoFocus : true,
			maxWidth : '100vw',
			width : '50vw'
		}).afterClosed().subscribe((contact: ContactGroup) => {
			if(contact) {
				this.contacts.unshift(new ContactGroup(contact));
				this.subject$.next(this.contacts);
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

}