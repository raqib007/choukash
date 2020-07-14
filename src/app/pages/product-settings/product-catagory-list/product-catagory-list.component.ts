
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
import { ProCatagoryList,SubCategory } from '../../../model/product-catagory';
import { ProductCatagoryFormComponent } from '../product-catagory-form/product-catagory-form.component';
import { ProductSubcategoryFormComponent } from '../product-subcategory-form/product-subcategory-form.component';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

export const CatagoryData = [
	{
		id: 1, 
		name: 'Category One ', 
		description: "Description",
		isExpand : false,
		items:[
			{id: 1, parentId:1, category:'Category one', name: 'Sub Category One', description: "Description"},
			{id: 2, parentId:1, category:'Category one', name: 'Sub Category Two', description: "Description"},
			{id: 3, parentId:1, category:'Category one', name: 'Sub Category Three', description: "Description"},
		]
	},
    {id: 2, name: 'Category Two', description: "Description",isExpand : false},
    {id: 3, name: 'Category Three', description: "Description",isExpand : false},
    {id: 4, name: 'Category Four', description: "Description",isExpand : false},
	{
		id: 5, 
		name: 'Category Five', 
		description: "Description",
		isExpand : false,
		items:[
			{id: 1, parentId:1, category:'Category one', name: 'Sub Category One', description: "Description"},
			{id: 2, parentId:1, category:'Category one', name: 'Sub Category Two', description: "Description"},
			{id: 3, parentId:1, category:'Category one', name: 'Sub Category Three', description: "Description"},
		]
	},
	{
		id: 6, 
		name: 'Category Six', 
		description: "Description",
		isExpand : false,
		items:[
			{id: 1, parentId:1, category:'Category one', name: 'Sub Category One', description: "Description"},
			{id: 2, parentId:1, category:'Category one', name: 'Sub Category Two', description: "Description"},
			{id: 3, parentId:1, category:'Category one', name: 'Sub Category Three', description: "Description"},
		]
	},
	{
		id: 7, 
		name: 'Category Seven', 
		description: "Description",
		isExpand : false,
		items:[
			{id: 1, parentId:1, category:'Category one', name: 'Sub Category One', description: "Description"},
			{id: 2, parentId:1, category:'Category one', name: 'Sub Category Two', description: "Description"},
			{id: 3, parentId:1, category:'Category one', name: 'Sub Category Three', description: "Description"},
		]
	}
];

@Component({
	selector: 'product-catagory-list',
	templateUrl: './product-catagory-list.component.html',
	styleUrls: ['./product-catagory-list.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*',padding:'20px 0px'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class ProductCatagoryListComponent implements List<ProCatagoryList>, OnInit, OnDestroy {

	subject$: ReplaySubject<ProCatagoryList[]> = new ReplaySubject<ProCatagoryList[]>(1);
	data$: Observable<ProCatagoryList[]>;
	catagory: ProCatagoryList[];

	formData = {
		id : -1,
		name : '',
		isExpand : false,
		description : ''
	};

	subformData = {
		id : -1,
		parentId : -1,
		category : '',
		name : '',
		description : ''
	};

	@Input()
	columns: ListColumn[] = [
		{ name: 'Expand', property: 'expand', visible: true,width:'10%' },
		{ name: 'ID', property: 'id', visible: true, isModelProperty: true,width:'10%' },
		{ name: 'Name', property: 'name', visible: true, isModelProperty: true ,width:'35%'},
		{ name: 'Description', property: 'description', visible: true, isModelProperty: true ,width:'35%'},
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];
	
	subCategoryColumns = ['id', 'name', 'description','cusColumns'];

	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<ProCatagoryList> | null;
	database: ListDatabase<ProCatagoryList>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	// @ViewChild(MatSort, { static: true }) sort: MatSort;

	/** For Nested Table**/
	@ViewChild('outerSort', { static: true }) sort: MatSort;
	@ViewChildren('innerSort') innerSort: QueryList<MatSort>;
	@ViewChildren('innerTables') innerTables: QueryList<MatTable<SubCategory>>;

	dataSource2: MatTableDataSource<ProCatagoryList>;
	productsData: ProCatagoryList[] = [];
	expandedElement: ProCatagoryList | null;

	constructor(private dialog: MatDialog,private cd: ChangeDetectorRef) {}
	
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
  
	ngOnInit() {
		/** For Nested Table**/
		CatagoryData.forEach(product => {
			if(product.items && Array.isArray(product.items) && product.items.length) {
			  this.productsData = [...this.productsData, {...product, items: new MatTableDataSource(product.items)}];
			} else {
			  this.productsData = [...this.productsData, product];
			}
		});
		this.dataSource2 = new MatTableDataSource(this.productsData);
		this.dataSource2.sort = this.sort;

		this.catagory = CatagoryData.map(l => new ProCatagoryList(l));
		this.subject$.next(this.catagory);
		this.data$ = this.subject$.asObservable();
		this.database = new ListDatabase<ProCatagoryList>();
		this.data$.pipe(
			takeUntil(componentDestroyed(this)),
			filter<ProCatagoryList[]>(Boolean)
		).subscribe((proList) => {
			this.catagory = proList;
			this.database.dataChange.next(proList);
			this.resultsLength = proList.length;
		});
		// this.dataSource = new ListDataSource<ProCatagoryList>(this.database, this.sort, this.paginator, this.columns);
	}
	
	/* Add New Sub Category */
	addSubCat(data){
		this.subformData.parentId = data.id;
		this.subformData.category = data.name;
		this.dialog.open(ProductSubcategoryFormComponent, { 
			panelClass: 'custom-dialog-container',
			data: this.subformData,
			autoFocus : true,
			maxWidth : '100vw',
			width : '50vw'
		}).afterClosed().subscribe((contact: ProCatagoryList) => {
			if(contact) {
				this.catagory.unshift(new ProCatagoryList(data));
				this.subject$.next(this.catagory);
			}
		});
	}
	/* Add and Edit Funtion For Product Category */
	editProduct(data){
		this.dialog.open(ProductCatagoryFormComponent, { 
			panelClass: 'custom-dialog-container',
			data: data,
			autoFocus : true,
			maxWidth : '100vw',
			width : '50vw'
		}).afterClosed().subscribe((contact: ProCatagoryList) => {
			if(contact) {
				this.catagory.unshift(new ProCatagoryList(data));
				this.subject$.next(this.catagory);
			}
		});
	}
	/* Delete Funtion For Product Category */
	deleteGroup(row){
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: {id: row.id, msg: 'Are you sure want to delete this record?'}
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}
	/* Edit Funtion For Product Sub Category */
	editSubCat(data){
		this.dialog.open(ProductSubcategoryFormComponent, { 
			panelClass: 'custom-dialog-container',
			data: data,
			autoFocus : true,
			maxWidth : '100vw',
			width : '50vw'
		}).afterClosed().subscribe((contact: ProCatagoryList) => {
			if(contact) {
				this.catagory.unshift(new ProCatagoryList(data));
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

	/** For Nested Table**/
	toggleRow(element: ProCatagoryList) {
		element.isExpand = !element.isExpand;
		element.items && (element.items as MatTableDataSource<SubCategory>).data.length ? 
		(this.expandedElement = this.expandedElement === element ? null : element) : null;
		this.cd.detectChanges();
		this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<SubCategory>).sort = this.innerSort.toArray()[index]);
		console.log(this.innerTables);
	}

	applyFilter(filterValue: string) {
		this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<SubCategory>).filter = filterValue.trim().toLowerCase());
	}
}
