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
import { BrandList } from '../../../model/band';
import { BrandFormComponent } from '../brand-form/brand-form.component';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';

export const BrandData = [
    {id: 1, name: 'Airwaves ', description: "Wrigley"},
    {id: 2, name: 'Babble Joe', description: "Wrigley"},
    {id: 3, name: 'Bazooka', description: "Wrigley"},
    {id: 4, name: 'Beechies', description: "Wrigley"},
    {id: 5, name: 'Big League Chew', description: "Wrigley"}
];

@Component({
    selector: 'product-brand-list',
    templateUrl: './brand-list.component.html',
    styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements List<BrandList>, OnInit, OnDestroy {

	subject$: ReplaySubject<BrandList[]> = new ReplaySubject<BrandList[]>(1);
	data$: Observable<BrandList[]>;
	brands: BrandList[];

	formData = {
		id : -1,
		name : '',
		description : ''
	};

	@Input()
	columns: ListColumn[] = [
		{ name: 'ID', property: 'id', visible: true, isModelProperty: true,width:'10%' },
		{ name: 'Name', property: 'name', visible: true, isModelProperty: true ,width:'40%'},
		{ name: 'Description', property: 'description', visible: true, isModelProperty: true ,width:'40%'},
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];

	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<BrandList> | null;
	database: ListDatabase<BrandList>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(private dialog: MatDialog) {}
	
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
  
	ngOnInit() {
		this.brands = BrandData.map(l => new BrandList(l));
		this.subject$.next(this.brands);
		this.data$ = this.subject$.asObservable();
		this.database = new ListDatabase<BrandList>();
		this.data$.pipe(
			takeUntil(componentDestroyed(this)),
			filter<BrandList[]>(Boolean)
		).subscribe((BrandList) => {
			this.brands = BrandList;
			this.database.dataChange.next(BrandList);
			this.resultsLength = BrandList.length;
		});
		this.dataSource = new ListDataSource<BrandList>(this.database, this.sort, this.paginator, this.columns);
	}
	
	/* Add and Edit Funtion For Contact Group */
	editGroup(data){
		this.dialog.open(BrandFormComponent, { 
			panelClass: 'custom-dialog-container',
			data: data,
			autoFocus : true,
			maxWidth : '100vw',
			width : '50vw'
		}).afterClosed().subscribe((contact: BrandList) => {
			if(contact) {
				this.brands.unshift(new BrandList(data));
				this.subject$.next(this.brands);
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
	onFilterChange(value) {
		if (!this.dataSource) {
			return;
		}
		this.dataSource.filter = value;
	}
	ngOnDestroy() {}

}
