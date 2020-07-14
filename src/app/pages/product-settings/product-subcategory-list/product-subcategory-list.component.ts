import { Component, Input, OnDestroy, OnInit, ViewChild,ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
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
import { SubCategory } from '../../../model/product-sub-category';
import { ProductCatagoryFormComponent } from '../product-catagory-form/product-catagory-form.component';
import { ProductSubcategoryFormComponent } from '../product-subcategory-form/product-subcategory-form.component';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';


export const CatagoryData = [
	{id: 1, parentId:1, category:'Category one', name: 'Sub Category One', description: "Description"},
	{id: 2, parentId:2, category:'Category two', name: 'Sub Category Two', description: "Description"},
	{id: 3, parentId:1, category:'Category one', name: 'Sub Category Three', description: "Description"}
];


@Component({
	selector: 'product-subcategory-list',
	templateUrl: './product-subcategory-list.component.html',
	styleUrls: ['./product-subcategory-list.component.scss']
})
export class ProductSubcategoryListComponent implements List<SubCategory>, OnInit, OnDestroy {

	subject$: ReplaySubject<SubCategory[]> = new ReplaySubject<SubCategory[]>(1);
	data$: Observable<SubCategory[]>;
	catagory: SubCategory[];

	formData = {
		id : -1,
		parentId : -1,
		category : '',
		name : '',
		description : ''
	};

	@Input()
	columns: ListColumn[] = [
		{ name: 'ID', property: 'id', visible: true, isModelProperty: true,width:'10%' },
		{ name: 'Product Category', property: 'category', visible: true, isModelProperty: true ,width:'30%'},
		{ name: 'Name', property: 'name', visible: true, isModelProperty: true ,width:'30%'},
		{ name: 'Description', property: 'description', visible: true, isModelProperty: true ,width:'20%'},
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];
	
	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<SubCategory> | null;
	database: ListDatabase<SubCategory>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	productsData: SubCategory[] = [];
	expandedElement: SubCategory | null;

	constructor(private dialog: MatDialog,private cd: ChangeDetectorRef) {}
	
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
  
	ngOnInit() {
		this.catagory = CatagoryData.map(l => new SubCategory(l));
		this.subject$.next(this.catagory);
		this.data$ = this.subject$.asObservable();
		this.database = new ListDatabase<SubCategory>();
		this.data$.pipe(
			takeUntil(componentDestroyed(this)),
			filter<SubCategory[]>(Boolean)
		).subscribe((proList) => {
			this.catagory = proList;
			this.database.dataChange.next(proList);
			this.resultsLength = proList.length;
		});
		this.dataSource = new ListDataSource<SubCategory>(this.database, this.sort, this.paginator, this.columns);
	}
	
	/* Add and Edit Funtion For Product Sub Category */
	editSubCat(data){
		this.dialog.open(ProductSubcategoryFormComponent, { 
			panelClass: 'custom-dialog-container',
			data: data,
			autoFocus : true,
			maxWidth : '100vw',
			width : '50vw'
		}).afterClosed().subscribe((contact: SubCategory) => {
			if(contact) {
				this.catagory.unshift(new SubCategory(data));
				this.subject$.next(this.catagory);
			}
		});
	}
	/* Delete Funtion For Product Sub Category */
	deleteSubCat(row){
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

