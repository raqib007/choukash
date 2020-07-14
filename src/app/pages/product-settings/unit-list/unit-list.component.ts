import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { List } from '../../../core/list/list.interface';
import { ListColumn } from '../../../core/list/list-column.model';
import { ListDataSource } from '../../../core/list/list-datasource';
import { ListDatabase } from '../../../core/list/list-database';
import { componentDestroyed } from '../../../core/utils/component-destroyed';
import { filter, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Unit } from '../../../model/unit';
import { UnitFormComponent } from '../unit-form/unit-form.component';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';


export const BrandData = [
    {id: 1, count: 'Count', name: 'Unit Name', abbreviation: "Abbreviation"},
    {id: 2, count: 'Weight', name: 'Unit Name', abbreviation: "Abbreviation"},
    {id: 3, count: 'Length', name: 'Unit Name', abbreviation: "Abbreviation"},
    {id: 4, count: 'Area', name: 'Unit Name', abbreviation: "Abbreviation"},
    {id: 5, count: 'Volumn', name: 'Unit Name', abbreviation: "Abbreviation"}
];

@Component({
	selector: 'product-unit-list',
	templateUrl: './unit-list.component.html',
	styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements List<Unit>, OnInit, OnDestroy {

	subject$: ReplaySubject<Unit[]> = new ReplaySubject<Unit[]>(1);
	data$: Observable<Unit[]>;
	units: Unit[];
	formData = {
		id : -1,
		count : '',
		name : '',
		abbreviation : ''
	};

	@Input()
	columns: ListColumn[] = [
		{ name: 'ID', property: 'id', visible: true, isModelProperty: true,width:'10%' },
		{ name: 'UOM Measure', property: 'count', visible: true, isModelProperty: true ,width:'30%'},
		{ name: 'UOM Name', property: 'name', visible: true, isModelProperty: true ,width:'25%'},
		{ name: 'Abbreviation', property: 'abbreviation', visible: true, isModelProperty: true ,width:'25%'},
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];

	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<Unit> | null;
	database: ListDatabase<Unit>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private dialog: MatDialog) {}
	
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
  
	ngOnInit() {
		this.units = BrandData.map(l => new Unit(l));
		this.subject$.next(this.units);
		this.data$ = this.subject$.asObservable();
		this.database = new ListDatabase<Unit>();
		this.data$.pipe(
			takeUntil(componentDestroyed(this)),
			filter<Unit[]>(Boolean)
		).subscribe(unit => {
			this.units = unit;
			this.database.dataChange.next(unit);
			this.resultsLength = unit.length;
		});
		this.dataSource = new ListDataSource<Unit>(this.database, this.sort, this.paginator, this.columns);
	}
	
	/* Add and Edit Funtion For Unit */
	editGroup(data){
		this.dialog.open(UnitFormComponent, { 
			panelClass: 'custom-dialog-container',
			data: data,
			autoFocus : true,
			maxWidth : '100vw',
			width : '50vw'
		}).afterClosed().subscribe((contact: Unit) => {
			if(contact) {
				this.units.unshift(new Unit(contact));
				this.subject$.next(this.units);
			}
		});
	}
	/* Delete Funtion For Unit */
	deleteGroup(row){
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: {id: row.id, msg: 'Are you sure want to delete this record?'}
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
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