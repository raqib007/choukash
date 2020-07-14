import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'erp-product-settings',
	templateUrl: './product-settings.component.html',
	styleUrls: ['./product-settings.component.scss']
})
export class ProductSettingsComponent implements OnInit {
	constructor() { }
	selectedIndex = 0;
	ngOnInit(): void {
	}
}
