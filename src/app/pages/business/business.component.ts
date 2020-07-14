import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-business',
	templateUrl: './business.component.html',
	styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

	selectedIndex = 0;
	lastIndex = 2;
	  
	constructor() { }

	ngOnInit(): void {
	}

}
