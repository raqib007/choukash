import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { BrandList } from '../../../model/band';

@Component({
	selector: 'app-brand-form',
	templateUrl: './brand-form.component.html',
	styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {

	form: FormGroup;
    title:string;
	btnTitle:string;
	
    formData = {
		id: '',
		contactType: '',
		name: ''
	};
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
		private dialogRef: MatDialogRef<BrandFormComponent>,
		@Inject(MAT_DIALOG_DATA) brand:BrandList
	) {

		this.title = (brand.id > -1)?'Edit Brand':'Create New Brand';
		this.btnTitle = (brand.id > -1)?'UPDATE':'SAVE';
		
		this.form = fb.group({
			id: [],
			name: [name, Validators.required],
			description: [name, Validators.required]
		});
		this.form.setValue(brand);
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
