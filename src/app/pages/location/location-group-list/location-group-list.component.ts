import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { List } from '../../../core/list/list.interface';
import { LocationGroup } from '../../../model/location-group';
import { ListColumn } from '../../../core/list/list-column.model';
import { ListDataSource } from '../../../core/list/list-datasource';
import { ListDatabase } from '../../../core/list/list-database';
import { componentDestroyed } from '../../../core/utils/component-destroyed';
import { filter, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LocationGroupData } from '../../../dummy-data/location-group';
import { LocationGroupCreateFormComponent } from '../location-group-create-form/location-group-create-form.component';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
	selector: 'erp-location-group-list',
	templateUrl: './location-group-list.component.html',
	styleUrls: ['./location-group-list.component.scss']
})
export class LocationGroupListComponent implements List<LocationGroup>, OnInit, OnDestroy {
	// disabled = false;
	// labelPosition = 1;
	// checked = false;
	// indeterminate = 3;

	subject$: ReplaySubject<LocationGroup[]> = new ReplaySubject<LocationGroup[]>(1);
	data$: Observable<LocationGroup[]>;
	locations: LocationGroup[];

	formData = {
		id : -1,
		locationName : '',
		description : '',
		type: '',
		shortName: '',
		users:''
	};

	@Input()
	columns: ListColumn[] = [
		{ name: 'ID', property: 'id', visible: true, isModelProperty: true,width:'5%' },
		{ name: 'Location Group', property: 'locationName', visible: true, isModelProperty: true ,width:'15%'},
		{ name: 'Description', property: 'description', visible: true, isModelProperty: true ,width:'10%'},
		{ name: 'Location Type', property: 'type', visible: true, isModelProperty: true,width:'10%' },
		{ name: 'Location Short Name', property: 'shortName', visible: true, isModelProperty: true,width:'15%' },
		{ name: 'Users', property: 'users', visible: true, isModelProperty: true ,width:'35%'},
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];

	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<LocationGroup> | null;
	database: ListDatabase<LocationGroup>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private dialog: MatDialog) {}
	
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
  
	ngOnInit() {
		this.locations = LocationGroupData.map(l => new LocationGroup(l));
		this.subject$.next(this.locations);
		this.data$ = this.subject$.asObservable();
		this.database = new ListDatabase<LocationGroup>();
		this.data$.pipe(
			takeUntil(componentDestroyed(this)),
			filter<LocationGroup[]>(Boolean)
		).subscribe((locationGroup) => {
			this.locations = locationGroup;
			this.database.dataChange.next(locationGroup);
			this.resultsLength = locationGroup.length;
		});
		this.dataSource = new ListDataSource<LocationGroup>(this.database, this.sort, this.paginator, this.columns);
	}
  
	indexNumber:number = 0;  
	
	indexItem(indexValue){
		this.indexNumber =  Number(indexValue);
	}
	
	/* Add and Edit Funtion For Location Group */
	editGroup(location){
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;
		dialogConfig.maxWidth = '100vw';
		dialogConfig.width = '750px';
		dialogConfig.data = location;
		const dialogRef = this.dialog.open(LocationGroupCreateFormComponent,dialogConfig);
        dialogRef.afterClosed().subscribe(
            val => console.log("Dialog output:", val)
		);
		
		// this.dialog.open(LocationGroupCreateFormComponent, {
		// 	data: location
		// }).afterClosed().subscribe(resp => {
		// if (resp) {
		// 	const index = this.locations.findIndex((existinglocation) => existinglocation.id === resp.id);
		// 	this.locations[index] = new LocationGroup(resp);
		// 	this.subject$.next(this.locations);
		// }
		// });
	}
	/* Delete Funtion For Location Group */
	deleteGroup(row){
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: {id: row.id, msg: 'Are you sure want to delete this record?'}
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
		// this.locations.splice(this.locations.findIndex((existinglocation) => existinglocation.id === location.id), 1);
		// this.subject$.next(this.locations);
	}
	onFilterChange(value) {
		if (!this.dataSource) {
			return;
		}
		this.dataSource.filter = value;
	}
	ngOnDestroy() {}

}