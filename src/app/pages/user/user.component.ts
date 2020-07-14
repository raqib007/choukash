import { Component, OnInit,ViewChild } from '@angular/core';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	selectedIndex = 2;
	
	constructor() { }

	ngOnInit(): void {
	}
	
}
