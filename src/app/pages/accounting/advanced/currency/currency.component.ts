import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup} from "@angular/forms";
import { SortablejsOptions } from 'ngx-sortablejs';

@Component({
	selector: 'advanced-currency',
	templateUrl: './currency.component.html',
	styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
	currencyList = [
		{id:1,value:'USD'},
		{id:2,value:'NZD'}
	];
	assignContactList = [
		{id:3,value:'GBP'},
		{id:4,value:'BDT'}
	];
	strategyList = [];
	groupOptions: SortablejsOptions = {
		group: 'testGroup',
		handle: '.drag-handle',
		animation: 300
	};
    constructor(
	) {
    }
    ngOnInit(): void {
	}
}
