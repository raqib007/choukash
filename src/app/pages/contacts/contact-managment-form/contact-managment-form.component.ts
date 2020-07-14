import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { SortablejsOptions } from 'ngx-sortablejs';

@Component({
	selector: 'app-contact-managment-form',
	templateUrl: './contact-managment-form.component.html',
	styleUrls: ['./contact-managment-form.component.scss']
})
export class ContactManagmentFormComponent implements OnInit {

	form: FormGroup;
    title:string;
	btnTitle:string;
	contactTypeList = [
		{id:1,value:'Customers'},
		{id:2,value:'Consignment Contact'},
		{id:3,value:'Branch Contact'},
		{id:4,value:'Vendor Contact'},
		{id:5,value:'Warehouse Contact'},
	];
	assignContactList = [
		{id:6,value:'Shipping Contact'},
		{id:7,value:'Head Office Contact'}
	];
	groupOptions: SortablejsOptions = {
		group: 'testGroup',
		handle: '.drag-handle',
		animation: 300
	};
    constructor(
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<ContactManagmentFormComponent>
	) {

		this.btnTitle = (true)?'UPDATE':'SAVE';
    }
    ngOnInit(): void {
	}

	save() {
        this.dialogRef.close(this.form.value);
    }
    close() {
        this.dialogRef.close();
    }
}

