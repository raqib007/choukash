import { Component, Inject, OnInit, ViewEncapsulation, ViewChild, Input, OnDestroy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { UserService,NotificationService,LocationService } from '../../../../../_services';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from 'src/app/core/list/list-column.model';
import { ReplaySubject, Observable } from 'rxjs';
import { ListDataSource } from 'src/app/core/list/list-datasource';
import { ListDatabase } from 'src/app/core/list/list-database';
import { MatPaginator } from '@angular/material/paginator';
import { takeUntil, filter } from 'rxjs/operators';
import { componentDestroyed } from 'src/app/core/utils/component-destroyed';
import { List } from 'src/app/core/list/list.interface';
import { MatTableDataSource } from '@angular/material/table';


export interface ProductList {
	name: string;
	code: string;
	category: string;
	brand: string;
	cost: string;
	price: string;
	adjust_price: string;
};
const ELEMENT_DATA: ProductList[] = [
	{name: 'Apple',code: '',category: '',brand: '',cost: '',price: '',adjust_price: ''},
	{name: 'Big Apple',code: '',category: '',brand: '',cost: '',price: '',adjust_price: ''},
	{name: 'Small Apple',code: '',category: '',brand: '',cost: '',price: '',adjust_price: ''},
	{name: 'Small Apple 2',code: '',category: '',brand: '',cost: '',price: '',adjust_price: ''}
];



export interface PaymentTerm {
	name: string;
	startdate:string;
	enddate:string;
	customer_id: string;
	inventory_type_id: string;
	product_id: string;
	sales_price_id: string;
	adjust_type_id: string;
	fixed_amount: string;
	rounding_type_id: string;
}

@Component({
	selector: 'app-cost-price-rule-create-form',
	templateUrl: './cost-price-rule-create-form.component.html',
	styleUrls: ['./cost-price-rule-create-form.component.scss']
})

// , List<ProductList>, OnDestroy 

export class CostPriceRuleCreateFormComponent implements OnInit{

	dummayData = [
		{name: 'Apple',code: '',category: '',brand: '',cost: '',price: '',adjust_price: ''},
		{name: 'Big Apple',code: '',category: '',brand: '',cost: '',price: '',adjust_price: ''},
		{name: 'Small Apple',code: '',category: '',brand: '',cost: '',price: '',adjust_price: ''},
		{name: 'Small Apple 2',code: '',category: '',brand: '',cost: '',price: '',adjust_price: ''}
	];

    form: FormGroup;
    title:string;
    btnTitle:string;
    showErrMsg = false;
    errMsg = '';
	currencyList = ['USD','GBP'];
	adjustTypeList = ['Increase By','Decrease By'];
	salesList = ['Percentage','Fixed Amount','Custom Price'];
	roundingList = ['.05','.10','.20','.25','.50','1.00'];
	productList = [
		{id:'1',name:'Product Name'},
		{id:'2',name:'Product Name 2'},
		{id:'3',name:'Product Name 3'},
		{id:'4',name:'Product Name 4'}
	];
	categoryList = [
		{id:'1',name:'Category Name'},
		{id:'2',name:'Category Name 2'},
		{id:'3',name:'Category Name 3'},
		{id:'4',name:'Category Name 4'}
	];
	brandList = [
		{id:'1',name:'Brand Name'},
		{id:'2',name:'Brand Name 2'},
		{id:'3',name:'Brand Name 3'},
		{id:'4',name:'Brand Name 4'}
	];
	displayedColumns: string[] = ['name', 'code','category', 'brand','cost', 'price', 'adjust_price'];
	dataSource = new MatTableDataSource(ELEMENT_DATA);
	  
	// subject$: ReplaySubject<ProductList[]> = new ReplaySubject<ProductList[]>(1);
	// data$: Observable<ProductList[]>;
	// pageSize = 5;
	// resultsLength: number;
	// tabIndex: number;
	// dataSource: ListDataSource<ProductList> | null;
	// database: ListDatabase<ProductList>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	@Input()
	columns: ListColumn[] = [
		{ name: 'Product', property: 'name', visible: true, isModelProperty: true ,width:'20%'},
		{ name: 'Product Code', property: 'code', visible: true, isModelProperty: true ,width:'15%'},
		{ name: 'Category', property: 'category', visible: true, isModelProperty: true ,width:'15%'},
		{ name: 'Brand', property: 'brand', visible: true, isModelProperty: true ,width:'10%'},
		{ name: 'Cost', property: 'cost', visible: true, isModelProperty: true ,width:'10%'},
		{ name: 'Sales Price', property: 'price', visible: true, isModelProperty: true ,width:'10%'},
		{ name: 'Adjust Price', property: 'adjust_price', visible: true, isModelProperty: true ,width:'10%'},
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];
	
	searchKeyword = 'value';
	locationType = [
		{id:1,value:'Customers'},
		{id:2,value:'Consignment Contact'},
		{id:3,value:'Branch Contact'},
		{id:4,value:'Vendor Contact'},
		{id:5,value:'Warehouse Contact'},
		{id:6,value:'Shipping Contact'},
		{id:7,value:'Head Office Contact'}
	];
	locationName = [
		{id:1,value:'Customers'},
		{id:2,value:'Consignment Contact'},
		{id:3,value:'Branch Contact'},
		{id:4,value:'Vendor Contact'},
		{id:5,value:'Warehouse Contact'},
		{id:6,value:'Shipping Contact'},
		{id:7,value:'Head Office Contact'}
	];
	contactType = [
		{id:1,value:'Customers'},
		{id:2,value:'Consignment Contact'},
		{id:3,value:'Branch Contact'},
		{id:4,value:'Vendor Contact'},
		{id:5,value:'Warehouse Contact'},
		{id:6,value:'Shipping Contact'},
		{id:7,value:'Head Office Contact'}
	];
	subContactType = [
		{id:1,value:'Retail'},
		{id:2,value:'Wholesale'},
		{id:3,value:'VIP'},
		{id:4,value:'Manager'},
		{id:5,value:'POS Operator'},
		{id:6,value:'Inventory Supervisor'},
		{id:7,value:'Delivery'},
		{id:8,value:'Suplier'},
		{id:9,value:'Consignments'},
		{id:10,value:'Warehouse Manager'},
		{id:11,value:'Picker'},
		{id:12,value:'Delivery'},
		{id:13,value:'Receiver'},
		{id:14,value:'Contact Person'},
		{id:15,value:'Accountant'},
		{id:16,value:'Inventory Manager'},
		{id:17,value:'Marketing Manager'},
		{id:18,value:'Delivery Fleet Manager'},
		{id:19,value:'Finance Manager'},
		{id:20,value:'Purchase Manager'},
		{id:21,value:'Sales Manager'},
		{id:22,value:'HR Manager'}
	];

    constructor(
            private fb: FormBuilder,
            private userService : UserService,
            private locationService : LocationService,
            private notifyService : NotificationService,
			private dialogRef: MatDialogRef<CostPriceRuleCreateFormComponent>,
			@Inject(MAT_DIALOG_DATA) paymentTerm:PaymentTerm 
		) {

        this.title = (paymentTerm.name != '')?'Edit Price Rule':'Add Price Rule';
		this.btnTitle = (paymentTerm.name != '')?'UPDATE':'SAVE';
		
        this.form = fb.group({
            name: [name, Validators.required],
            startdate: [name],
            enddate: [name],
            customer_id: [name],
            currency: [name],
            inventory_type_id: [name],
            product_id: [name],
            sales_price_id: [name],
            adjust_type_id: [name],
            fixed_amount: [name],
            rounding_type_id: [name]
        });
        // this.form.setValue(paymentTerm);
	}
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
    ngOnInit() {
		this.dataSource.sort = this.sort;

		// this.subject$.next(this.dummayData);
		// this.data$ = this.subject$.asObservable();
		// this.database = new ListDatabase<ProductList>();
		// this.data$.pipe(
		// 	takeUntil(componentDestroyed(this)),
		// 	filter<ProductList[]>(Boolean)
		// ).subscribe((userGroup) => {
		// 	this.dummayData = userGroup;
		// 	this.database.dataChange.next(userGroup);
		// 	this.resultsLength = userGroup.length;
		// });
		// this.dataSource = new ListDataSource<ProductList>(this.database, this.sort, this.paginator, this.columns);
    }
    saveData() {
		// this.form.value.is_active = true;
        if(this.form.value.user_id == ''){
            this.userService.saveUserData(this.form.value).subscribe((res : any) => {
                if(res.code == 200){
                    this.dialogRef.close(this.form.value);
                }else{
                    this.showErrMsg = true;
                    this.errMsg = res.message;
                }
            });
        }else{
            this.userService.updateUserData(this.form.value).subscribe((res : any) => {
                if(res.code == 200){
                    this.dialogRef.close(this.form.value);
                }else{
                    this.showErrMsg = true;
                    this.errMsg = res.message;
                }
            });
        }
    }
    close() {
        this.dialogRef.close();
	}
	onFilterChange(value) {
		if (!this.dataSource) {
			return;
		}
		this.dataSource.filter = value;
	}
	ngOnDestroy() {}
	deleteProduct(row){

	}
}