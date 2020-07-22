import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ListColumn } from '../../../../core/list/list-column.model';
import { FormGroup } from '@angular/forms';
import { SortablejsOptions } from 'ngx-sortablejs';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/_services';
import { CostPriceFormComponent } from './cost-price-form/cost-price-form.component';

export interface PaymentTerm {
	name: string;
	currency: string;
}
const ELEMENT_DATA: PaymentTerm[] = [
	{name: '',currency: ''},
	{name: '',currency: ''},
	{name: '',currency: ''},
	{name: '',currency: ''}
];

const form_data: PaymentTerm = {name: '',currency: ''};

@Component({
	selector: 'accounting-cost-price',
	templateUrl: './cost-price.component.html',
	styleUrls: ['./cost-price.component.scss']
})
export class CostPriceComponent implements OnInit {
	displayedColumns: string[] = ['name', 'currency'];
	dataSource = ELEMENT_DATA;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	@Input()
	columns: ListColumn[] = [
		{ name: 'Price Group Name', property: 'name', visible: true, isModelProperty: true ,width:'45%'},
		{ name: 'Currency', property: 'currency', visible: true, isModelProperty: true ,width:'40%'},
		{ name: 'Actions', property: 'actions', visible: true}
	] as ListColumn[];

    constructor(
		public dialog: MatDialog,
		private notifyService : NotificationService
	) {
		
	}
	get visibleColumns() {
		return this.columns.filter(column => column.visible).map(column => column.property);
	}
    ngOnInit(): void {
		
	}
	addPayment(){
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.maxWidth = '100vw';
		dialogConfig.width = '40vw';
		dialogConfig.data = form_data;
		const dialogRef = this.dialog.open(CostPriceFormComponent,dialogConfig);
        dialogRef.afterClosed().subscribe(
			val => {
				if(val == 'no'){

				}else{
					if(form_data.name == ''){
						this.notifyService.showSuccess("User data has been successfully saved!!", "User");
					}else{
						this.notifyService.showSuccess("User data has been successfully updated!!", "User");
					}
					this.ngOnInit();
				}
			}
		);
	}
}
