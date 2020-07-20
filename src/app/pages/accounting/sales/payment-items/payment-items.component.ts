import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { List } from '../../../../core/list/list.interface';
import { ListColumn } from '../../../../core/list/list-column.model';
import { ListDataSource } from '../../../../core/list/list-datasource';
import { ListDatabase } from '../../../../core/list/list-database';
import { componentDestroyed } from '../../../../core/utils/component-destroyed';
import { filter, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { StockControl } from '../../../../model/stock-control';
import { FormGroup } from '@angular/forms';
import { SortablejsOptions } from 'ngx-sortablejs';

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
	) {
	}
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
    ngOnInit(): void {
		
	}
}