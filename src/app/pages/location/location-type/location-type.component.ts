import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LocationService, NotificationService } from 'src/app/_services';
import { SortablejsOptions } from 'ngx-sortablejs';
import { ListColumn } from 'src/app/core/list/list-column.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { LocationTypeCreateFormComponent } from './location-type-create-form/location-type-create-form.component';


export interface Location{
	location_type_id : string;
	location_type_name : string;
	description : string;
	is_active : boolean;
}

@Component({
	selector: 'erp-location-type',
	templateUrl: './location-type.component.html',
	styleUrls: ['./location-type.component.scss']
})
export class LocationTypeComponent implements OnInit {

	allContactList = [];
	activeContactList = [];
	groupOptions: SortablejsOptions = {
		group: 'testGroup',
		handle: '.drag-handle',
		animation: 300
	};

	pageSize = 5;
	locations: Location[];
	formData = {
		location_type_id : '',
		location_type_name : '',
		description : '',
		is_active : false
	};
	allSelected = false;
	selection = new SelectionModel<Location>(true, []);
	dataSource = new MatTableDataSource<Location>(this.locations);

	@Input()
	columns: ListColumn[] = [
		{ name: 'Checkbox', property: 'is_active', visible: true,width:'10%' },
		{ name: 'Location Type', property: 'location_type_name', visible: true, isModelProperty: true, width:'40%' },
		{ name: 'Description', property: 'description', visible: true, isModelProperty: true, width:'40%' },
		{ name: 'Actions', property: 'actions', visible: true },
	] as ListColumn[];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		private dialog: MatDialog,
		private locationService: LocationService,
		private notifyService: NotificationService,
	) { 
	}
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
	ngOnInit(): void {
		this.locationService.getAllLocationType()
		.subscribe(
			res => {
				this.locations = res.map(m => {
					return {
						location_type_id : m.location_type_id,
						location_type_name : m.location_type_name,
						description : m.description,
						is_active : m.is_active
					}
				});
			},
			err => {
				this.notifyService.showError(err, "Contact Type");
			},
			() => {
				this.dataSource = new MatTableDataSource<Location>(this.locations);
				this.dataSource.paginator = this.paginator;
			}
		);
	}
	/* Add and Edit Funtion For Contact Group */
	editContact(location){
		this.dialog.open(LocationTypeCreateFormComponent, { 
			panelClass: 'custom-dialog-container',
			data: location,
			autoFocus : true,
			maxWidth : '100vw',
			width : '50vw'
		}).afterClosed().subscribe(
			val => {
				if(val == 'no'){

				}else{
					if(location.location_type_id == ''){
						this.notifyService.showSuccess("Location type data has been successfully saved!!", "Location");
					}else{
						this.notifyService.showSuccess("Location type data has been successfully updated!!", "Location");
					}
					this.ngOnInit();
				}
			}
		);
	}
	/* Delete Funtion For Location Type */
	deleteContact(row){
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: {id: row.contact_sub_group_id, msg: 'Are you sure want to delete this record?'}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result == 'yes'){
				this.locationService.deleteLocationType(row.contact_type_id).subscribe((res : any) =>{
					if(res.code == 200){
						this.notifyService.showSuccess("Location type data has been successfully deleted!!", "Location Type");
						this.ngOnInit();
					}else{
						this.notifyService.showError(res.message, "Location Type");
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
		this.dataSource.data.forEach(row => this.selection.select(row));
	}
	onFilterChange(value) {
		if (!this.dataSource) {
			return;
		}
		this.dataSource.filter = value;
	}
}