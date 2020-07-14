import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { ProCatagoryList } from '../../../model/product-catagory';

@Component({
	selector: 'app-product-catagory-form',
	templateUrl: './product-catagory-form.component.html',
	styleUrls: ['./product-catagory-form.component.scss']
})
export class ProductCatagoryFormComponent implements OnInit {

	form: FormGroup;
    title:string;
	btnTitle:string;
	
    constructor(
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<ProductCatagoryFormComponent>,
		@Inject(MAT_DIALOG_DATA) catagory:ProCatagoryList
	) {

		this.title = (catagory.id > -1)?'Edit Product Catagory':'Add New Product Catagory';
		this.btnTitle = (catagory.id > -1)?'UPDATE':'SAVE';
		let obj = {
			id:catagory.id,
			name:catagory.name,
			description:catagory.description
		}
		this.form = fb.group({
			id: [],
			name: [name, Validators.required],
			description: [name, Validators.required]
		});
		this.form.setValue(obj);
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
