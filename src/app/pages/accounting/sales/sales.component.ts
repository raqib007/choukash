import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'accounting-sales',
	templateUrl: './sales.component.html',
	styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
	tabIndex = 0;
	
	constructor() { }

	ngOnInit(): void {
	}

}
