import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { List } from '../../../core/list/list.interface';
import { ContactGroup } from '../../../model';
import { ListColumn } from '../../../core/list/list-column.model';
import { ListDataSource } from '../../../core/list/list-datasource';
import { ListDatabase } from '../../../core/list/list-database';
import { componentDestroyed } from '../../../core/utils/component-destroyed';
import { filter, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { ContactService, NotificationService } from 'src/app/_services';
import { ContactSubGroupCreateFormComponent } from '../contact-sub-group-create-form/contact-sub-group-create-form.component';

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
		contact_sub_group_id : '',
		contact_sub_group_name : '',
		contact_type_id : '',
		contact_type_name : '',
		is_active : true,
		description : '',
		properties : '',
	};
	
	@Input()
	columns: ListColumn[] = [
		{ name: 'Sub Group Name', property: 'contact_sub_group_name', visible: true, isModelProperty: true ,width:'50%'},
		{ name: 'Contact Type', property: 'contact_type_name', visible: true, isModelProperty: true ,width:'40%'},
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];

	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<ContactGroup> | null;
	database: ListDatabase<ContactGroup>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private dialog: MatDialog,
		private contactService : ContactService,
		private notifyService : NotificationService
	) {}
	
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
  
	ngOnInit() {
		this.contactService.getAllContactGroup()
		.subscribe(
			res => {
				res = res.filter((item : any) => item.is_active == true);
				this.contacts = res.map(l => new ContactGroup(l));
			},
			err => {
				this.notifyService.showError(err, "Contact Sub Group");
			},
			() => {
				this.prepareData();
			}
		);
	}
	prepareData(){
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
		}).afterClosed().subscribe(
			val => {
				if(val == 'no'){

				}else{
					if(contact.contact_sub_group_id == ''){
						this.notifyService.showSuccess("Contact sub group data has been successfully saved!!", "Contact Sub Group");
					}else{
						this.notifyService.showSuccess("Contact sub groups data has been successfully updated!!", "Contact Sub Group");
					}
					this.ngOnInit();
				}
			}
		);
	}
	/* Delete Funtion For Contact Group */
	deleteGroup(row){
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: {id: row.contact_sub_group_id, msg: 'Are you sure want to delete this record?'}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result == 'yes'){
				this.contactService.deleteContactGroup(row.contact_sub_group_id).subscribe((res : any) =>{
					if(res.code == 200){
						this.notifyService.showSuccess("Contact sub group data has been successfully deleted!!", "Contact sub Group");
						this.ngOnInit();
					}else{
						this.notifyService.showError(res.message, "Contact sub Group");
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

}