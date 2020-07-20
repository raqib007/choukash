import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'erp-accounting',
	templateUrl: './accounting.component.html',
	styleUrls: ['./accounting.component.scss']
})
export class AccountingComponent implements OnInit {
	selectedIndex = 1;
	selectedIndexChild = 0;
	constructor() { }

	ngOnInit(): void {
	}

}
