import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { List } from '../../../core/list/list.interface';
import { Location } from '../../../model/location';
import { ListColumn } from '../../../core/list/list-column.model';
import { ListDataSource } from '../../../core/list/list-datasource';
import { ListDatabase } from '../../../core/list/list-database';
import { componentDestroyed } from '../../../core/utils/component-destroyed';
import { LocationCreateFormComponent } from '../location-create-form/location-create-form.component';
import { filter, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { MatTabChangeEvent} from '@angular/material/tabs';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { LocationService, NotificationService } from 'src/app/_services';

@Component({
	selector: 'erp-location-list',
	templateUrl: './location-list.component.html',
	styleUrls: ['./location-list.component.scss'],
	// animations: [...ROUTE_TRANSITION],
	// host: { '[@routeTransition]': '' }
})
export class LocationListComponent implements List<Location>, OnInit, OnDestroy {
	// disabled = false;
	// labelPosition = 1;
	// checked = false;
	// indeterminate = 3;

	formData = {
		location_id : '',
		address_type : '',
		location_group_id : '',
		location_group_name : '',
		location_type_id : '',
		location_type_name : '',
		business_name : '',
		job_title : '',
		first_name : '',
		last_name : '',
		open_address : '',
		zip : '',
		city : '',
		country : '',
		telephone : '',
		mobile : '',
		email : '',
		company_id : '',
		contact_sub_group_id : '',
		contact_type_id : '',
		is_active: true,
		location_code : '',
		website : ''
	};

	subject$: ReplaySubject<Location[]> = new ReplaySubject<Location[]>(1);
	data$: Observable<Location[]>;
	locations: Location[];
	@Input()
	columns: ListColumn[] = [
		{ name: 'Checkbox', property: 'checkbox', visible: true },
		{ name: 'Location Group', property: 'location_group_name', visible: true, isModelProperty: true },
		{ name: 'Location', property: 'location_code', visible: true, isModelProperty: true },
		{ name: 'Location Type', property: 'location_type_name', visible: true, isModelProperty: true },
		{ name: 'Busines Name', property: 'business_name', visible: true, isModelProperty: true },
		{ name: 'Contact Authority', property: 'job_title', visible: false, isModelProperty: true },
		{ name: 'First Name', property: 'first_name', visible: false, isModelProperty: true },
		{ name: 'Last Name', property: 'last_name', visible: false, isModelProperty: true },
		{ name: 'Address', property: 'open_address', visible: true, isModelProperty: true },
		{ name: 'Zipcode', property: 'zip', visible: true, isModelProperty: true },
		{ name: 'City', property: 'city', visible: true, isModelProperty: true },
		{ name: 'Country', property: 'country', visible: true, isModelProperty: true },
		{ name: 'Phone', property: 'telephone', visible: true, isModelProperty: true },
		{ name: 'Mobile', property: 'mobile', visible: true, isModelProperty: true },
		{ name: 'Email', property: 'email', visible: true, isModelProperty: true },
		{ name: 'Actions', property: 'actions', visible: true },
	] as ListColumn[];

	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<Location> | null;
	database: ListDatabase<Location>;

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
		this.locationService.getAllLocation()
		.subscribe(
			res => {
				console.log('res = ',res);
				// this.locations = res.filter((item : any) => item.is_active == true);
			},
			err => {
				this.notifyService.showError(err, "Location");
			},
			() => {
				this.prepareData();
			}
		);
	}
	prepareData(){
		this.subject$.next(this.locations);
		this.data$ = this.subject$.asObservable();
		this.database = new ListDatabase<Location>();
		this.data$.pipe(
			takeUntil(componentDestroyed(this)),
			filter<Location[]>(Boolean)
		).subscribe((locations) => {
			this.locations = locations;
			this.database.dataChange.next(locations);
			this.resultsLength = locations.length;
		});
		this.dataSource = new ListDataSource<Location>(this.database, this.sort, this.paginator, this.columns);
	}

	createLocation(location) { 
		this.dialog.open(
			LocationCreateFormComponent, { 
				panelClass: 'custom-dialog-container',
				data : location
			}).afterClosed().subscribe((location: Location) => {
				if (location) {
					this.locations.unshift(new Location(location));
					this.subject$.next(this.locations);
				}
		});
	} 
	
	updateLocation(location) {
		this.dialog.open(LocationCreateFormComponent, {
			data: location
		}).afterClosed().subscribe(resp => {
		if (resp) {
			const index = this.locations.findIndex((existinglocation) => existinglocation.location_id === resp.location_id);
			this.locations[index] = new Location(resp);
			this.subject$.next(this.locations);
		}
		});
	}
	
	deleteLocation(location) {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: {id: location.id, msg: 'Are you sure want to delete this record?'}
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
		this.locations.splice(this.locations.findIndex((existinglocation) => existinglocation.location_id === location.location_id), 1);
		this.subject$.next(this.locations);
	}

	/* Add and Edit Funtion For Location Group */
	editLocation(location){
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;
		dialogConfig.maxWidth = '100vw';
		dialogConfig.width = '80vw';
		dialogConfig.data = location;
		const dialogRef = this.dialog.open(LocationCreateFormComponent,dialogConfig);
        dialogRef.afterClosed().subscribe(
            val => console.log("Dialog output:", val)
		);
		dialogRef.afterClosed().subscribe(
			val => {
				if(val == 'no'){

				}else{
					if(location.location_id == ''){
						this.notifyService.showSuccess("Location data has been successfully saved!!", "Location");
					}else{
						this.notifyService.showSuccess("Location data has been successfully updated!!", "Location");
					}
					this.ngOnInit();
				}
			}
        );
	}
	/* Delete Funtion For Location */
	deleteGroup(row){
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: {id: row.id, msg: 'Are you sure want to delete this record?'}
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result == 'yes'){
				this.locationService.deleteLocationGroup(row.location_group_id).subscribe((res : any) =>{
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
