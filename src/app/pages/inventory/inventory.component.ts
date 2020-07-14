import { Component, Input, OnDestroy, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { List } from '../../core/list/list.interface';
import { Product } from '../../model/product';
import { ListColumn } from '../../core/list/list-column.model';
import { ListDataSource } from '../../core/list/list-datasource';
import { ListDatabase } from '../../core/list/list-database';
import { componentDestroyed } from '../../core/utils/component-destroyed';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, takeUntil,startWith, map } from 'rxjs/operators';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';


export const ProductData = [
    {
      'id': 1,
      'productNo': 'A20012568',
      'productName': 'big Apple',
      'barcode': '375294 586012',
      'uom': 'Kg',
      'stockinHand': '100',
      'committedStock': '20',
      'stockAvailable': '80',
      'stockControl': 'ExpDt',
      'priceRetail': '25',
      'priceWholesale': '20',
      'priceVIP': '23',
      'priceUSD': '25',
      'priceNZD': '32',
      'costUSD':'12',
      'costNZD': '18',
      'costEUR': '10'
    },
    {
      'id': 2,
      'productNo': 'A20012568',
      'productName': 'big Apple',
      'barcode': '375294 586012',
      'uom': 'Kg',
      'stockinHand': '100',
      'committedStock': '20',
      'stockAvailable': '80',
      'stockControl': 'ExpDt',
      'priceRetail': '25',
      'priceWholesale': '20',
      'priceVIP': '23',
      'priceUSD': '25',
      'priceNZD': '32',
      'costUSD':'12',
      'costNZD': '18',
      'costEUR': '10'
    },
    {
      'id': 3,
      'productNo': 'A20012568',
      'productName': 'big Apple',
      'barcode': '375294 586012',
      'uom': 'Kg',
      'stockinHand': '100',
      'committedStock': '20',
      'stockAvailable': '80',
      'stockControl': 'ExpDt',
      'priceRetail': '25',
      'priceWholesale': '20',
      'priceVIP': '23',
      'priceUSD': '25',
      'priceNZD': '32',
      'costUSD':'12',
      'costNZD': '18',
      'costEUR': '10'
    },
    {
      'id': 4,
      'productNo': 'A20012568',
      'productName': 'big Apple',
      'barcode': '375294 586012',
      'uom': 'Kg',
      'stockinHand': '100',
      'committedStock': '20',
      'stockAvailable': '80',
      'stockControl': 'ExpDt',
      'priceRetail': '25',
      'priceWholesale': '20',
      'priceVIP': '23',
      'priceUSD': '25',
      'priceNZD': '32',
      'costUSD':'12',
      'costNZD': '18',
      'costEUR': '10'
    },
    {
      'id': 5,
      'productNo': 'A20012568',
      'productName': 'big Apple',
      'barcode': '375294 586012',
      'uom': 'Kg',
      'stockinHand': '100',
      'committedStock': '20',
      'stockAvailable': '80',
      'stockControl': 'ExpDt',
      'priceRetail': '25',
      'priceWholesale': '20',
      'priceVIP': '23',
      'priceUSD': '25',
      'priceNZD': '32',
      'costUSD':'12',
      'costNZD': '18',
      'costEUR': '10'
    },
    {
      'id': 6,
      'productNo': 'A20012568',
      'productName': 'big Apple',
      'barcode': '375294 586012',
      'uom': 'Kg',
      'stockinHand': '100',
      'committedStock': '20',
      'stockAvailable': '80',
      'stockControl': 'ExpDt',
      'priceRetail': '25',
      'priceWholesale': '20',
      'priceVIP': '23',
      'priceUSD': '25',
      'priceNZD': '32',
      'costUSD':'12',
      'costNZD': '18',
      'costEUR': '10'
    },
    {
      'id': 7,
      'productNo': 'A20012568',
      'productName': 'big Apple',
      'barcode': '375294 586012',
      'uom': 'Kg',
      'stockinHand': '100',
      'committedStock': '20',
      'stockAvailable': '80',
      'stockControl': 'ExpDt',
      'priceRetail': '25',
      'priceWholesale': '20',
      'priceVIP': '23',
      'priceUSD': '25',
      'priceNZD': '32',
      'costUSD':'12',
      'costNZD': '18',
      'costEUR': '10'
    },
    {
      'id': 8,
      'productNo': 'A20012568',
      'productName': 'big Apple',
      'barcode': '375294 586012',
      'uom': 'Kg',
      'stockinHand': '100',
      'committedStock': '20',
      'stockAvailable': '80',
      'stockControl': 'ExpDt',
      'priceRetail': '25',
      'priceWholesale': '20',
      'priceVIP': '23',
      'priceUSD': '25',
      'priceNZD': '32',
      'costUSD':'12',
      'costNZD': '18',
      'costEUR': '10'
    },
    {
      'id': 9,
      'productNo': 'A20012568',
      'productName': 'big Apple',
      'barcode': '375294 586012',
      'uom': 'Kg',
      'stockinHand': '100',
      'committedStock': '20',
      'stockAvailable': '80',
      'stockControl': 'ExpDt',
      'priceRetail': '25',
      'priceWholesale': '20',
      'priceVIP': '23',
      'priceUSD': '25',
      'priceNZD': '32',
      'costUSD':'12',
      'costNZD': '18',
      'costEUR': '10'
    },
    {
      'id': 10,
      'productNo': 'A20012568',
      'productName': 'big Apple',
      'barcode': '375294 586012',
      'uom': 'Kg',
      'stockinHand': '100',
      'committedStock': '20',
      'stockAvailable': '80',
      'stockControl': 'ExpDt',
      'priceRetail': '25',
      'priceWholesale': '20',
      'priceVIP': '23',
      'priceUSD': '25',
      'priceNZD': '32',
      'costUSD':'12',
      'costNZD': '18',
      'costEUR': '10'
    },
    {
      'id': 11,
      'productNo': 'A20012568',
      'productName': 'big Apple',
      'barcode': '375294 586012',
      'uom': 'Kg',
      'stockinHand': '100',
      'committedStock': '20',
      'stockAvailable': '80',
      'stockControl': 'ExpDt',
      'priceRetail': '25',
      'priceWholesale': '20',
      'priceVIP': '23',
      'priceUSD': '25',
      'priceNZD': '32',
      'costUSD':'12',
      'costNZD': '18',
      'costEUR': '10'
    },
    {
      'id': 12,
      'productNo': 'A20012568',
      'productName': 'big Apple',
      'barcode': '375294 586012',
      'uom': 'Kg',
      'stockinHand': '100',
      'committedStock': '20',
      'stockAvailable': '80',
      'stockControl': 'ExpDt',
      'priceRetail': '25',
      'priceWholesale': '20',
      'priceVIP': '23',
      'priceUSD': '25',
      'priceNZD': '32',
      'costUSD':'12',
      'costNZD': '18',
      'costEUR': '10'
    },
    {
      'id': 13,
      'productNo': 'A20012568',
      'productName': 'big Apple',
      'barcode': '375294 586012',
      'uom': 'Kg',
      'stockinHand': '100',
      'committedStock': '20',
      'stockAvailable': '80',
      'stockControl': 'ExpDt',
      'priceRetail': '25',
      'priceWholesale': '20',
      'priceVIP': '23',
      'priceUSD': '25',
      'priceNZD': '32',
      'costUSD':'12',
      'costNZD': '18',
      'costEUR': '10'
    },
    {
      'id': 14,
      'productNo': 'A20012568',
      'productName': 'big Apple',
      'barcode': '375294 586012',
      'uom': 'Kg',
      'stockinHand': '100',
      'committedStock': '20',
      'stockAvailable': '80',
      'stockControl': 'ExpDt',
      'priceRetail': '25',
      'priceWholesale': '20',
      'priceVIP': '23',
      'priceUSD': '25',
      'priceNZD': '32',
      'costUSD':'12',
      'costNZD': '18',
      'costEUR': '10'
    },
    {
      'id': 15,
      'productNo': 'A20012568',
      'productName': 'big Apple',
      'barcode': '375294 586012',
      'uom': 'Kg',
      'stockinHand': '100',
      'committedStock': '20',
      'stockAvailable': '80',
      'stockControl': 'ExpDt',
      'priceRetail': '25',
      'priceWholesale': '20',
      'priceVIP': '23',
      'priceUSD': '25',
      'priceNZD': '32',
      'costUSD':'12',
      'costNZD': '18',
      'costEUR': '10'
    },
    {
      'id': 16,
      'productNo': 'A20012568',
      'productName': 'big Apple',
      'barcode': '375294 586012',
      'uom': 'Kg',
      'stockinHand': '100',
      'committedStock': '20',
      'stockAvailable': '80',
      'stockControl': 'ExpDt',
      'priceRetail': '25',
      'priceWholesale': '20',
      'priceVIP': '23',
      'priceUSD': '25',
      'priceNZD': '32',
      'costUSD':'12',
      'costNZD': '18',
      'costEUR': '10'
    },
    {
      'id': 17,
      'productNo': 'A20012568',
      'productName': 'big Apple',
      'barcode': '375294 586012',
      'uom': 'Kg',
      'stockinHand': '100',
      'committedStock': '20',
      'stockAvailable': '80',
      'stockControl': 'ExpDt',
      'priceRetail': '25',
      'priceWholesale': '20',
      'priceVIP': '23',
      'priceUSD': '25',
      'priceNZD': '32',
      'costUSD':'12',
      'costNZD': '18',
      'costEUR': '10'
    }
];

@Component({
	selector: 'app-inventory',
	templateUrl: './inventory.component.html',
	styleUrls: ['./inventory.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class InventoryComponent implements List<Product>, OnInit, OnDestroy {
	// disabled = false;
	// labelPosition = 1;
	// checked = false;
	// indeterminate = 3;

	searchKeyword = 'value';
	formData = {
		id: -1,
		productNo: '',
		productName: '',
		barcode: '',
		uom: '',
		stockinHand: '',
		committedStock: '',
		stockAvailable: '',
		stockControl: '',
		priceRetail: '',
		priceWholesale: '',
		priceVIP: '',
		priceUSD: '',
		priceNZD: '',
		costUSD: '',
		costNZD: '',
		costEUR: ''
	};
	groupformData = {
		id: -1,
		contactType: '',
		name: ''
	};
	subject$: ReplaySubject<Product[]> = new ReplaySubject<Product[]>(1);
	data$: Observable<Product[]>;
	products: Product[];
	@Input()
	columns: ListColumn[] = [
		{ name: 'Checkbox', property: 'checkbox', visible: true, color : '#F5F5F5',fontcolor:'#0000008a'},
		{ name: 'Product Number', property: 'productNo', visible: true, isModelProperty: true,color : '#F5F5F5' ,fontcolor:'#0000008a'},
		{ name: 'Product Name', property: 'productName', visible: true, isModelProperty: true ,color : '#F5F5F5',fontcolor:'#0000008a'},
		{ name: 'Barcode', property: 'barcode', visible: true, isModelProperty: true ,color : '#F5F5F5',fontcolor:'#0000008a'},
		{ name: 'UOM', property: 'uom', visible: true, isModelProperty: true ,color : '#F5F5F5',fontcolor:'#0000008a'},
		
		{ name: 'Stock In Hand', property: 'stockinHand', visible: true, isModelProperty: true, color : '#2196F3' ,fontcolor:'#FFF'},
		{ name: 'Committed Stock', property: 'committedStock', visible: true, isModelProperty: true, color : '#2196F3' ,fontcolor:'#FFF'},
		{ name: 'Stock Available', property: 'stockAvailable', visible: true, isModelProperty: true, color : '#2196F3' ,fontcolor:'#FFF'},
		{ name: 'Stock Control', property: 'stockControl', visible: true, isModelProperty: true, color : '#2196F3' ,fontcolor:'#FFF'},
		
		{ name: 'Price Retail', property: 'priceRetail', visible: true, isModelProperty: true, color : '#8BC34A' ,fontcolor:'#FFF'},
		{ name: 'Price Wholesale', property: 'priceWholesale', visible: true, isModelProperty: true, color : '#8BC34A' ,fontcolor:'#FFF'},
		{ name: 'Price VIP', property: 'priceVIP', visible: true, isModelProperty: true, color : '#8BC34A' ,fontcolor:'#FFF'},
		{ name: 'Price USD', property: 'priceUSD', visible: true, isModelProperty: true, color : '#8BC34A' ,fontcolor:'#FFF'},
		{ name: 'Price NZD', property: 'priceNZD', visible: true, isModelProperty: true, color : '#8BC34A' ,fontcolor:'#FFF'},
		
		{ name: 'Cost USD', property: 'costUSD', visible: true, isModelProperty: true, color : '#FFC107' ,fontcolor:'#0000008a'},
		{ name: 'Cost NZD', property: 'costNZD', visible: true, isModelProperty: true, color : '#FFC107' ,fontcolor:'#0000008a'},
		{ name: 'COST EUR', property: 'costEUR', visible: true, isModelProperty: true, color : '#FFC107' ,fontcolor:'#0000008a'},
		{ name: 'Actions', property: 'actions', visible: true},
	] as ListColumn[];

	pageSize = 5;
	resultsLength: number;
	tabIndex: number;
	dataSource: ListDataSource<Product> | null;
	database: ListDatabase<Product>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	selectedLocType = '';
	selectedLoc = '';
	selectedConType = '';
	selectedSubConType = '';

	branchList = [
		{id:1,value:'Gulshan'},
		{id:2,value:'Banani'},
		{id:3,value:'Uttara'}
	];
	categoryList = [
		{id:1,value:'Category one'},
		{id:2,value:'Category two'},
		{id:3,value:'Category three'},
		{id:4,value:'Category four'},
		{id:5,value:'Category five'},
		{id:6,value:'Category six'},
		{id:7,value:'Category seven'}
	];
	inventoryType = [
		{id:1,value:'Inventory'},
		{id:2,value:'Part'},
		{id:3,value:'Non Inventory'},
		{id:4,value:'Service'},
		{id:5,value:'Internal Use'},
		{id:6,value:'Capital Equipment'},
		{id:7,value:'Shipping'}
	];
	brandList = [
		{id:1,value:'Brand one'},
		{id:2,value:'Brand two'},
		{id:3,value:'Brand three'},
		{id:4,value:'Brand four'},
		{id:5,value:'Brand six'}
	];
	dropdownList = [];
	selectedItems = [];
  	dropdownSettings:IDropdownSettings;

	constructor(private dialog: MatDialog) {}
	
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
  
	ngOnInit() {
		this.products = ProductData.map(product => new Product(product));
		this.subject$.next(this.products);
		this.data$ = this.subject$.asObservable();
		this.database = new ListDatabase<Product>();
		this.data$.pipe(
			takeUntil(componentDestroyed(this)),
			filter<Product[]>(Boolean)
		).subscribe((products) => {
			this.products = products;
			this.database.dataChange.next(products);
			this.resultsLength = products.length;
		});
		this.dataSource = new ListDataSource<Product>(this.database, this.sort, this.paginator, this.columns);

		this.selectedItems = [
			{ id: 3, value: 'Non Inventory' },
			{ id: 4, value: 'Service' }
		];
		this.dropdownSettings = {
			singleSelection: false,
			idField: 'id',
			textField: 'value',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 2,
			allowSearchFilter: true
		};
	}

	createContact() { 
		// this.dialog.open(ContactListCreateFormComponent, { 
		// 	panelClass: 'custom-dialog-container',
		// 	data: this.formData,
		// 	autoFocus : true,
		// 	maxWidth : '100vw',
		// 	width : '60vw'
		// }).afterClosed().subscribe((contact: Contact) => {
		// 	if(contact) {
		// 		this.contacts.unshift(new Contact(contact));
		// 		this.subject$.next(this.contacts);
		// 	}
		// });
	} 
	
	updateContact(contact) {
		// this.dialog.open(ContactListCreateFormComponent, {
		// 	data: contact,
		// 	autoFocus : true,
		// 	maxWidth : '100vw',
		// 	width : '60vw'
		// }).afterClosed().subscribe(resp => {
		// if (resp) {
		// 	const index = this.contacts.findIndex((existingcontact) => existingcontact.id === resp.id);
		// 	this.contacts[index] = new Contact(resp);
		// 	this.subject$.next(this.contacts);
		// 	}
		// });
	}
	
	deleteContact(product) {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '250px',
			data: {id: product.id, msg: 'Are you sure want to delete this record?'}
		});
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
		this.products.splice(this.products.findIndex((existingproduct) => existingproduct.id === product.id), 1);
		this.subject$.next(this.products);
	}
	
	onFilterChange(value) {
		if (!this.dataSource) {
			return;
		}
		this.dataSource.filter = value;
	}
	ngOnDestroy() {}

	selectEvent(item) {
		// do something with selected item
	}
	onChangeSearch(val: string) {
		// fetch remote data from here
		// And reassign the 'data' which is binded to 'data' property.
	}
	onFocused(e){
		// do something when input is focused
	}

	createContactSubGroup() { 
		// this.dialog.open(ContactSubGroupCreateFormComponent, { 
		// 	panelClass: 'custom-dialog-container',
		// 	data: this.groupformData,
		// 	autoFocus : true,
		// 	maxWidth : '100vw',
		// 	width : '60vw'
		// }).afterClosed().subscribe((contact: Contact) => {
			
		// });
	}

	onItemSelect(item: any) {
		console.log(item);
	}
	onSelectAll(items: any) {
		console.log(items);
	}
}
