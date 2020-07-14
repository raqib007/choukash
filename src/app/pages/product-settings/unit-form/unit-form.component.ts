import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { Unit } from '../../../model/unit';

@Component({
	selector: 'app-unit-form',
	templateUrl: './unit-form.component.html',
	styleUrls: ['./unit-form.component.scss']
})
export class UnitFormComponent implements OnInit {

	form: FormGroup;
    title:string;
	btnTitle:string;
	list = [
		{id:1,value:'Count'},
		{id:2,value:'Weight'},
		{id:3,value:'Length'},
		{id:4,value:'Area'},
		{id:5,value:'Volumn'},
		{id:6,value:'Time'}
	];
	contactType = [
		{id:1,value:'Customers'},
		{id:2,value:'Consignment Contact'},
		{id:3,value:'Branch Contact'},
		{id:4,value:'Vendor Contact'},
		{id:5,value:'Warehouse Contact'},
		{id:6,value:'Shipping Contact'},
		{id:7,value:'Head Office Contact'}
	];
    constructor(
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<UnitFormComponent>,
		@Inject(MAT_DIALOG_DATA) unit:Unit
	) {

		this.title = (unit.id > -1)?'Edit Unit of Measure':'Add New Unit of Measure';
		this.btnTitle = (unit.id > -1)?'UPDATE':'SAVE';
		
		this.form = fb.group({
			id: [],
			count: [name, Validators.required],
			name: [name, Validators.required],
			abbreviation: [name, Validators.required]
		});
		this.form.setValue(unit);
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

