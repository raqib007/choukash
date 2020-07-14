import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LIST_FADE_ANIMATION } from '../../../../core/utils/list.animation';

@Component({
	selector: 'inventory-product-uom',
	templateUrl: './uom.component.html',
	styleUrls: ['./uom.component.scss'],
	animations: [...LIST_FADE_ANIMATION]
})
export class UomComponent implements OnInit {
	selectedIndex = 0;
	base = 'Each';
	formData = {
		id:0,
		unit: '',
	};
	unitList = ['Kg','Each','Liter','Bottle','Gram'];
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
  
}
