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
import { LocationService, NotificationService } from 'src/app/_services';

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
		location_group_id : '',
		location_group_name : '',
		location_type_id : '',
		location_type_name : '',
		description : '',
		is_active: true,
		short_name: '',
		users:''
	};

	@Input()
	columns: ListColumn[] = [
		{ name: 'Location Group', property: 'location_group_name', visible: true, isModelProperty: true ,width:'18%'},
		{ name: 'Description', property: 'description', visible: true, isModelProperty: true ,width:'12%'},
		{ name: 'Location Type', property: 'location_type_name', visible: true, isModelProperty: true,width:'10%' },
		{ name: 'Location Short Name', property: 'short_name', visible: true, isModelProperty: true,width:'15%' },
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

	constructor(
		private dialog: MatDialog,
		private locationService: LocationService,
		private notifyService : NotificationService
	) {}
	
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
	ngOnInit() {
		this.locationService.getAllLocationGroup()
		.subscribe(
			res => {
				res = res.filter((item : any) => item.is_active == true);
				this.locations = res.map(l => {
					let data = {
						location_group_id : l.location_group_id,
						location_group_name : l.location_group_name,
						location_type_id : l.location_type_id,
						location_type_name : "No location name",
						description : l.description,
						short_name : l.short_name,
						is_active : l.is_active,
						// properties : l.properties,
						// created_on : l.created_on,
						// created_by : l.created_by,
						// updated_on : l.updated_on,
						// updated_by : l.updated_by,
						users : ''
					};
					return new LocationGroup(data);
				});
			},
			err => {
				this.notifyService.showError(err, "User Group");
			},
			() => {
				this.prepareData();
			}
		);
	}
	prepareData(){
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
		dialogRef.afterClosed().subscribe(
			val => {
				if(val == 'no'){

				}else{
					if(location.location_group_id == ''){
						this.notifyService.showSuccess("Location group data has been successfully saved!!", "Location Group");
					}else{
						this.notifyService.showSuccess("Location group data has been successfully updated!!", "Location Group");
					}
					this.ngOnInit();
				}
			}
        );
	}
	/* Delete Funtion For Location Group */
	deleteGroup(row){
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: {id: row.id, msg: 'Are you sure want to delete this record?'}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result == 'yes'){
				this.locationService.updateLocationGroupData(row.location_group_id).subscribe((res : any) =>{
					if(res.code == 200){
						this.notifyService.showSuccess("Location group data has been successfully deleted!!", "Location Group");
						this.ngOnInit();
					}else{
						this.notifyService.showError(res.message, "Location Group");
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