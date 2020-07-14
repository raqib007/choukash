import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { SubCategory } from '../../../model/product-catagory';

@Component({
	selector: 'app-product-subcategory-form',
	templateUrl: './product-subcategory-form.component.html',
	styleUrls: ['./product-subcategory-form.component.scss']
})
export class ProductSubcategoryFormComponent implements OnInit {

	form: FormGroup;
    title:string;
	btnTitle:string;
	list = [
		{id:1,value:'Category One'},
		{id:2,value:'Category Two'},
		{id:3,value:'Category Three'},
		{id:4,value:'Category Four'}
	];
	
    constructor(
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<ProductSubcategoryFormComponent>,
		@Inject(MAT_DIALOG_DATA) catagory:SubCategory
	) {

		this.title = (catagory.id > -1)?'Edit Product Sub Catagory':'Add New Product Sub Catagory';
		this.btnTitle = (catagory.id > -1)?'UPDATE':'SAVE';
		console.log('from form',catagory);
		this.form = fb.group({
			id: [],
			parentId: [],
			category: [],
			name: [name, Validators.required],
			description: [name, Validators.required]
		});
		this.form.setValue(catagory);
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