import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup} from "@angular/forms";
import { SortablejsOptions } from 'ngx-sortablejs';

@Component({
	selector: 'accounting-cost-method',
	templateUrl: './cost-method.component.html',
	styleUrls: ['./cost-method.component.scss']
})
export class CostMethodComponent implements OnInit {
	form: FormGroup;
    title:string;
	btnTitle:string;
	contactTypeList = [
		{id:1,value:'FIFO Cost'},
		{id:2,value:'last Purchased Cost'}
	];
	assignContactList = [
		{id:3,value:'Average Cost'},
		{id:4,value:'Standard Cost'}
	];
	groupOptions: SortablejsOptions = {
		group: 'testGroup',
		handle: '.drag-handle',
		animation: 300
	};
    constructor(
	) {

		this.btnTitle = (true)?'UPDATE':'SAVE';
    }
    ngOnInit(): void {
	}
}
