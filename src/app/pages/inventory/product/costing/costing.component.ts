import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ProductCosting } from 'src/app/model';
import { List } from 'src/app/core/list/list.interface';
import { ReplaySubject, Observable } from 'rxjs';
import { ListColumn } from 'src/app/core/list/list-column.model';
import { ListDataSource } from 'src/app/core/list/list-datasource';
import { ListDatabase } from 'src/app/core/list/list-database';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { takeUntil, filter } from 'rxjs/operators';
import { componentDestroyed } from 'src/app/core/utils/component-destroyed';

export interface PeriodicElement {
	name: string;
	position: string;
	weight: string;
	symbol: string;
	ucost: string;
	tcost: string;
	details: string;
}
  
const ELEMENT_DATA: PeriodicElement[] = [
	{position: '', name: '', weight: '', symbol: '', ucost: '', tcost: '', details: ''},
	{position: '', name: '', weight: '', symbol: '', ucost: '', tcost: '', details: ''},
	{position: '', name: '', weight: '', symbol: '', ucost: '', tcost: '', details: ''},
	{position: '', name: '', weight: '', symbol: '', ucost: '', tcost: '', details: ''}
];
@Component({
	selector: 'inventory-product-costing',
	templateUrl: './costing.component.html',
	styleUrls: ['./costing.component.scss']
})

export class CostingComponent implements List<ProductCosting>, OnInit, OnDestroy {
	formData = {
		id:0,
		location: '',
	};
	locationGroup = [
		{id:1,name:'Standard Cost'},
		{id:2,name:'FIFO Cost'},
		{id:3,name:'Last Purchased Cost'},
		{id:4,name:'Average Cost'}
	];
	unitList = ['Kg','Each','Liter','Bottle','Gram'];
	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'ucost', 'tcost', 'details'];
	subject$: ReplaySubject<ProductCosting[]> = new ReplaySubject<ProductCosting[]>(1);
	data$: Observable<ProductCosting[]>;
	invoiceData: ProductCosting[] = [
		{invoice_number: 'INV10001234', receiving_date: '15/07/2020', product_name: 'Apple', quantity: '10pc', ucost: '100', tcost: '110', vendor_details: 'In House'},
		{invoice_number: 'INV10001234', receiving_date: '15/07/2020', product_name: 'Apple', quantity: '10pc', ucost: '100', tcost: '110', vendor_details: 'In House'},
		{invoice_number: 'INV10001234', receiving_date: '15/07/2020', product_name: 'Apple', quantity: '10pc', ucost: '100', tcost: '110', vendor_details: 'In House'},
		{invoice_number: 'INV10001234', receiving_date: '15/07/2020', product_name: 'Apple', quantity: '10pc', ucost: '100', tcost: '110', vendor_details: 'In House'},
		{invoice_number: 'INV10001234', receiving_date: '15/07/2020', product_name: 'Apple', quantity: '10pc', ucost: '100', tcost: '110', vendor_details: 'In House'},
		{invoice_number: 'INV10001234', receiving_date: '15/07/2020', product_name: 'Apple', quantity: '10pc', ucost: '100', tcost: '110', vendor_details: 'In House'},
		{invoice_number: 'INV10001234', receiving_date: '15/07/2020', product_name: 'Apple', quantity: '10pc', ucost: '100', tcost: '110', vendor_details: 'In House'},
		{invoice_number: 'INV10001234', receiving_date: '15/07/2020', product_name: 'Apple', quantity: '10pc', ucost: '100', tcost: '110', vendor_details: 'In House'},
		{invoice_number: 'INV10001234', receiving_date: '15/07/2020', product_name: 'Apple', quantity: '10pc', ucost: '100', tcost: '110', vendor_details: 'In House'},
		{invoice_number: 'INV10001234', receiving_date: '15/07/2020', product_name: 'Apple', quantity: '10pc', ucost: '100', tcost: '110', vendor_details: 'In House'},
		{invoice_number: 'INV10001234', receiving_date: '15/07/2020', product_name: 'Apple', quantity: '10pc', ucost: '100', tcost: '110', vendor_details: 'In House'},
		{invoice_number: 'INV10001234', receiving_date: '15/07/2020', product_name: 'Apple', quantity: '10pc', ucost: '100', tcost: '110', vendor_details: 'In House'},
		{invoice_number: 'INV10001234', receiving_date: '15/07/2020', product_name: 'Apple', quantity: '10pc', ucost: '100', tcost: '110', vendor_details: 'In House'},
		{invoice_number: 'INV10001234', receiving_date: '15/07/2020', product_name: 'Apple', quantity: '10pc', ucost: '100', tcost: '110', vendor_details: 'In House'},
		{invoice_number: 'INV10001234', receiving_date: '15/07/2020', product_name: 'Apple', quantity: '10pc', ucost: '100', tcost: '110', vendor_details: 'In House'},
		{invoice_number: 'INV10001234', receiving_date: '15/07/2020', product_name: 'Apple', quantity: '10pc', ucost: '100', tcost: '110', vendor_details: 'In House'},
		{invoice_number: 'INV10001234', receiving_date: '15/07/2020', product_name: 'Apple', quantity: '10pc', ucost: '100', tcost: '110', vendor_details: 'In House'}
	];

	@Input()
	columns: ListColumn[] = [
		{ name: 'Invoice Number', property: 'invoice_number', visible: true, isModelProperty: true ,width:'15%'},
		{ name: 'Receiving Date', property: 'receiving_date', visible: true, isModelProperty: true ,width:'15%'},
		{ name: 'Product Name', property: 'product_name', visible: true, isModelProperty: true,width:'15%' },
		{ name: 'Quantity', property: 'quantity', visible: true, isModelProperty: true ,width:'10%'},
		{ name: 'Unit Cost', property: 'ucost', visible: true, isModelProperty: true ,width:'15%'},
		{ name: 'Total Cost', property: 'tcost', visible: true, isModelProperty: true,width:'15%' },
		{ name: 'Vendor Details', property: 'vendor_details', visible: true, isModelProperty: true, width:'15%' }
	] as ListColumn[];

	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<ProductCosting> | null;
	database: ListDatabase<ProductCosting>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	  
	constructor(
	) {
		
	}
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
	ngOnInit() {
		this.subject$.next(this.invoiceData);
		this.data$ = this.subject$.asObservable();
		this.database = new ListDatabase<ProductCosting>();
		this.data$.pipe(
			takeUntil(componentDestroyed(this)),
			filter<ProductCosting[]>(Boolean)
		).subscribe((userGroup) => {
			this.invoiceData = userGroup;
			this.database.dataChange.next(userGroup);
			this.resultsLength = userGroup.length;
		});
		this.dataSource = new ListDataSource<ProductCosting>(this.database, this.sort, this.paginator, this.columns);
	}
	onFilterChange(value) {
		if (!this.dataSource) {
			return;
		}
		this.dataSource.filter = value;
	}
	ngOnDestroy() {}
}
