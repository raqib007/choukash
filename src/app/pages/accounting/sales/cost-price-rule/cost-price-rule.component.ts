import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from '../../../../core/list/list-column.model';
import { FormGroup } from '@angular/forms';
import { SortablejsOptions } from 'ngx-sortablejs';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/_services';
import { CostPriceRuleCreateFormComponent } from './cost-price-rule-create-form/cost-price-rule-create-form.component';

export interface PaymentTerm {
	name: string;
	startdate: string;
	enddate: string;
}
const ELEMENT_DATA: PaymentTerm[] = [
	{name: '',startdate: '',enddate: ''},
	{name: '',startdate: '',enddate: ''},
	{name: '',startdate: '',enddate: ''},
	{name: '',startdate: '',enddate: ''}
];

const form_data: PaymentTerm = {name: '',startdate: '',enddate: ''};

@Component({
	selector: 'sales-cost-price-rule',
	templateUrl: './cost-price-rule.component.html',
	styleUrls: ['./cost-price-rule.component.scss']
})
export class CostPriceRuleComponent implements OnInit {
	displayedColumns: string[] = ['name','startdate','enddate'];
	dataSource = ELEMENT_DATA;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	@Input()
	columns: ListColumn[] = [
		{ name: 'Price Rule Name', property: 'name', visible: true, isModelProperty: true ,width:'30%'},
		{ name: 'Start Date', property: 'startdate', visible: true, isModelProperty: true ,width:'30%'},
		{ name: 'End Date', property: 'enddate', visible: true, isModelProperty: true ,width:'25%'},
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
		public dialog: MatDialog,
		private notifyService : NotificationService
	) {
		
	}
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
    ngOnInit(): void {
		
	}
	addPayment(){
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.maxWidth = '100vw';
		dialogConfig.width = '60vw';
		dialogConfig.data = form_data;
		// dialogConfig.panelClass = 'mat-dialog-md';
		const dialogRef = this.dialog.open(CostPriceRuleCreateFormComponent,dialogConfig);
        dialogRef.afterClosed().subscribe(
			val => {
				if(val == 'no'){

				}else{
					if(form_data.name == ''){
						this.notifyService.showSuccess("User data has been successfully saved!!", "User");
					}else{
						this.notifyService.showSuccess("User data has been successfully updated!!", "User");
					}
					this.ngOnInit();
				}
			}
		);
	}
	editRule(row){

	}
	deleteRule(row){

	}

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
}

