import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LIST_FADE_ANIMATION } from '../../../../core/utils/list.animation';

@Component({
	selector: 'inventory-product-replenishment',
	templateUrl: './replenishment.component.html',
	styleUrls: ['./replenishment.component.scss'],
	animations: [...LIST_FADE_ANIMATION]
})
export class ReplenishmentComponent implements OnInit {
	selectedIndex = 3;
	showNewLeadTime = false;
	base = 'Each';
	formData = {
		id:0,
		unit: '',
	};
	unitList = ['Kg','Each','Liter','Bottle','Gram'];
	vendorLists = [{id:1,name:'Vendor 1'},{id:2,name:'Vendor 2'}];
	relation = [{id:1,name:'Greater Than Base Unit'},{id:2,name:'Smaller Than Base Unit'}];
	constructor(
	  private cd: ChangeDetectorRef
	) { }
  
	ngOnInit() {
	}
  
	archive(task) {
		// const index = this.tasks.indexOf(task);
		// if (index > -1) {
		// this.tasks.splice(index, 1);
		// const snackbarRef = this.snackbar.open('Archived Task', 'UNDO');

		// this.cd.markForCheck();

		// snackbarRef.onAction().subscribe(() => {
		// 	this.tasks.splice(index, 0, task);

		// 	this.cd.markForCheck();
		// });
		// }
	}
	addNewLeadTime(){
		this.showNewLeadTime = true;
	}
  
}
