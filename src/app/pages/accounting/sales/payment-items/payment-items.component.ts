import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from '../../../../core/list/list-column.model';
import { FormGroup } from '@angular/forms';
import { SortablejsOptions } from 'ngx-sortablejs';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/_services';
import { PaymentItemsCreateFormComponent } from './payment-items-create-form/payment-items-create-form.component';

export interface PaymentTerm {
	name: string;
	condition: string;
	dueNoDate: string;
	dueDateMonth: string;
}
const ELEMENT_DATA: PaymentTerm[] = [
	{name: '', condition: '', dueNoDate: '', dueDateMonth: ''},
	{name: '', condition: '', dueNoDate: '', dueDateMonth: ''},
	{name: '', condition: '', dueNoDate: '', dueDateMonth: ''},
	{name: '', condition: '', dueNoDate: '', dueDateMonth: ''}
];

const form_data: PaymentTerm = {name: '', condition: '', dueNoDate: '', dueDateMonth: ''};


@Component({
	selector: 'sales-payment-items',
	templateUrl: './payment-items.component.html',
	styleUrls: ['./payment-items.component.scss']
})
export class PaymentItemsComponent implements OnInit {
	form: FormGroup;
    title:string;
	btnTitle:string;
	contactTypeList = [
		{id:1,value:'Cash on Delivery'},
		{id:2,value:'Payment in Advance'}
	];
	assignContactList = [];
	groupOptions: SortablejsOptions = {
		group: 'testGroup',
		handle: '.drag-handle',
		animation: 300
	};
	displayedColumns: string[] = ['name', 'condition', 'dueNoDate', 'dueDateMonth'];
	dataSource = ELEMENT_DATA;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	@Input()
	columns: ListColumn[] = [
		{ name: 'Payment Term Name', property: 'name', visible: true, isModelProperty: true ,width:'20%'},
		{ name: 'Condition', property: 'condition', visible: true, isModelProperty: true ,width:'20%'},
		{ name: 'Due After No of Days', property: 'dueDate', visible: true, isModelProperty: true ,width:'20%'},
		{ name: 'Due on Fixed Date of Month', property: 'dueDateMonth', visible: true, isModelProperty: true ,width:'20%'},
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];

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
		const dialogRef = this.dialog.open(PaymentItemsCreateFormComponent,dialogConfig);
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
}