import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

import { ALL_IN_ONE_TABLE_DEMO_DATA } from './data';

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

	subject$: ReplaySubject<Location[]> = new ReplaySubject<Location[]>(1);
	data$: Observable<Location[]>;
	locations: Location[];
	@Input()
	columns: ListColumn[] = [
		{ name: 'Checkbox', property: 'checkbox', visible: true },
		{ name: 'Location Group', property: 'locgroup', visible: true, isModelProperty: true },
		{ name: 'Location', property: 'location', visible: true, isModelProperty: true },
		{ name: 'Location Type', property: 'locationType', visible: true, isModelProperty: true },
		{ name: 'Busines Name', property: 'name', visible: true, isModelProperty: true },
		{ name: 'Contact Authority', property: 'jobtitle', visible: false, isModelProperty: true },
		{ name: 'First Name', property: 'firstName', visible: false, isModelProperty: true },
		{ name: 'Last Name', property: 'lastName', visible: false, isModelProperty: true },
		{ name: 'Address', property: 'address', visible: true, isModelProperty: true },
		{ name: 'Zipcode', property: 'zipcode', visible: true, isModelProperty: true },
		{ name: 'City', property: 'city', visible: true, isModelProperty: true },
		{ name: 'Country', property: 'country', visible: true, isModelProperty: true },
		{ name: 'Phone', property: 'phoneNumber', visible: true, isModelProperty: true },
		{ name: 'Mobile', property: 'mobileNumber', visible: true, isModelProperty: true },
		{ name: 'Email', property: 'mail', visible: true, isModelProperty: true },
		{ name: 'Actions', property: 'actions', visible: true },
	] as ListColumn[];

	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<Location> | null;
	database: ListDatabase<Location>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private dialog: MatDialog) {}
	
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
  
	ngOnInit() {
		this.locations = ALL_IN_ONE_TABLE_DEMO_DATA.map(location => new Location(location));
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
  
	tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
		console.log('tabChangeEvent => ', tabChangeEvent);
		console.log('index => ', tabChangeEvent.index);
		this.tabIndex = tabChangeEvent.index;
	}
  
	indexNumber:number = 0;  
	
	indexItem(indexValue){
		this.indexNumber =  Number(indexValue);
	}
	
	createLocation() { 
		this.dialog.open(LocationCreateFormComponent, { panelClass: 'custom-dialog-container' })
			.afterClosed().subscribe((location: Location) => {
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
			const index = this.locations.findIndex((existinglocation) => existinglocation.id === resp.id);
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
		this.locations.splice(this.locations.findIndex((existinglocation) => existinglocation.id === location.id), 1);
		this.subject$.next(this.locations);
	}
	
	onFilterChange(value) {
		if (!this.dataSource) {
			return;
		}
		this.dataSource.filter = value;
	}
	ngOnDestroy() {}
}
