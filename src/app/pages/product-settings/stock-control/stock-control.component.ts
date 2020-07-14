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
import { StockControl } from '../../../model/stock-control';

export const StockData = [
    {id: 1, control: 'FIFO', abbreviation: "FIFO",description: 'Stock receive at earlier date/time will be sold first ',inputtype:'Date Time'},
    {id: 2, control: 'Expire Date', abbreviation: "Exp",description: 'Stock will be sold as per expire date',inputtype:'Date'},
    {id: 3, control: 'Lot Number', abbreviation: "Lot",description: 'Stock will be sold as bulk receiving lot number',inputtype:'Text'},
    {id: 4, control: 'Serial Number', abbreviation: "Ser",description: 'Stock will be sold as per the serial numbers of each product',inputtype:'Serial Number'}
];

@Component({
    selector: 'product-stock-control',
    templateUrl: './stock-control.component.html',
    styleUrls: ['./stock-control.component.scss']
})
export class StockControlComponent implements List<StockControl>, OnInit, OnDestroy {

	subject$: ReplaySubject<StockControl[]> = new ReplaySubject<StockControl[]>(1);
	data$: Observable<StockControl[]>;
	stockControls: StockControl[];
	formData = {
		id : -1,
		count : '',
		name : '',
		abbreviation : ''
	};

	@Input()
	columns: ListColumn[] = [
        { name: 'Checkbox', property: 'checkbox', visible: true },
		// { name: 'ID', property: 'id', visible: true, isModelProperty: true,width:'10%' },
		{ name: 'Stock Control Method', property: 'control', visible: true, isModelProperty: true ,width:'15%'},
		{ name: 'Abbreviation', property: 'abbreviation', visible: true, isModelProperty: true ,width:'10%'},
		{ name: 'Description', property: 'description', visible: true, isModelProperty: true ,width:'35%'},
		{ name: 'Input Type', property: 'inputtype', visible: true, isModelProperty: true ,width:'20%'},
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];

	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<StockControl> | null;
	database: ListDatabase<StockControl>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private dialog: MatDialog) {}
	
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
  
	ngOnInit() {
		this.stockControls = StockData.map(l => new StockControl(l));
		this.subject$.next(this.stockControls);
		this.data$ = this.subject$.asObservable();
		this.database = new ListDatabase<StockControl>();
		this.data$.pipe(
			takeUntil(componentDestroyed(this)),
			filter<StockControl[]>(Boolean)
		).subscribe(unit => {
			this.stockControls = unit;
			this.database.dataChange.next(unit);
			this.resultsLength = unit.length;
		});
		this.dataSource = new ListDataSource<StockControl>(this.database, this.sort, this.paginator, this.columns);
	}
	
	/* Add and Edit Funtion For Unit */
	editGroup(data){
		// this.dialog.open(UnitFormComponent, { 
		// 	panelClass: 'custom-dialog-container',
		// 	data: data,
		// 	autoFocus : true,
		// 	maxWidth : '100vw',
		// 	width : '50vw'
		// }).afterClosed().subscribe((contact: Unit) => {
		// 	if(contact) {
		// 		this.units.unshift(new Unit(contact));
		// 		this.subject$.next(this.units);
		// 	}
		// });
	}
	/* Delete Funtion For Unit */
	deleteGroup(row){
		// const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
		// 	width: '250px',
		// 	data: {id: row.id, msg: 'Are you sure want to delete this record?'}
		// });
		// dialogRef.afterClosed().subscribe(result => {
		// 	console.log('The dialog was closed');
		// });
	}
	onFilterChange(value) {
		if (!this.dataSource) {
			return;
		}
		this.dataSource.filter = value;
	}
	ngOnDestroy() {}

}