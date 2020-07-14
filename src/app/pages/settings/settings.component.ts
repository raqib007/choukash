import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ROUTE_TRANSITION } from '../../app.animation';
import { isNgTemplate } from '@angular/compiler';

@Component({
	selector: 'erp-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
	animations: [...ROUTE_TRANSITION],
	host: { '[@routeTransition]': '' }
})
export class SettingsComponent implements OnInit, AfterContentInit {
	seletedIndex = 2;
	constructor() { }
	sidebarList = [];
	subHeaderName = "Business";
	ngOnInit() {
		this.sidebarList = [
			{id:0,name:'Business',pageName:'<app-business></app-business>'},
			{id:1,name:'Locations',pageName:'<app-location></app-location>'},
			{id:2,name:'User',pageName:'<app-user></app-user>'},
			{id:3,name:'Contacts',pageName:'<app-contacts></app-contacts>'},
			{id:4,name:'Product Setting',pageName:'<app-contacts></app-contacts>'}
		];
	}

	ngAfterContentInit() {
	}

	scrollTo(elem) {
		elem.scrollIntoView({
			behavior: 'smooth', // or "auto" or "instant"
			block: 'start', // or "end"
			inline: 'nearest'
		});
	}

	changeItem(index){
		this.seletedIndex = index.id;
		this.subHeaderName = index.name;
	}
}
