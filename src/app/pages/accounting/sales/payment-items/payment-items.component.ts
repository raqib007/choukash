import { Component, Inject, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { FormGroup} from "@angular/forms";
import { SortablejsOptions } from 'ngx-sortablejs';
import { ListColumn } from 'src/app/core/list/list-column.model';

export interface PeriodicElement {
	name: string;
	condition: string;
	dueNoDate: string;
	dueDateMonth: string;
}
  
const ELEMENT_DATA: PeriodicElement[] = [
	{name: '', condition: '', dueNoDate: '', dueDateMonth: ''},
	{name: '', condition: '', dueNoDate: '', dueDateMonth: ''},
	{name: '', condition: '', dueNoDate: '', dueDateMonth: ''},
	{name: '', condition: '', dueNoDate: '', dueDateMonth: ''}
];


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

	@Input()
	columns: ListColumn[] = [
		{ name: 'Payment Term Name', property: 'name', visible: true, isModelProperty: true ,width:'15%'},
		{ name: 'Condition', property: 'condition', visible: true, isModelProperty: true ,width:'10%'},
		{ name: 'Due After No of Days', property: 'dueDate', visible: true, isModelProperty: true ,width:'35%'},
		{ name: 'Due on Fixed Date of Month', property: 'dueDateMonth', visible: true, isModelProperty: true ,width:'20%'},
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];

    constructor(
	) {
    }
    ngOnInit(): void {
	}
}