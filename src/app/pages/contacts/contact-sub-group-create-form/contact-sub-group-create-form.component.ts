import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { ContactGroup } from '../../../model/contact-group';

@Component({
	selector: 'app-contact-sub-group-create-form',
	templateUrl: './contact-sub-group-create-form.component.html',
	styleUrls: ['./contact-sub-group-create-form.component.scss']
})
export class ContactSubGroupCreateFormComponent implements OnInit {

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
		private dialogRef: MatDialogRef<ContactSubGroupCreateFormComponent>,
		@Inject(MAT_DIALOG_DATA) Contact:ContactGroup
	) {

		this.title = (Contact.id > -1)?'Edit Contact Sub Group':'Create New Contact Sub Group';
		this.btnTitle = (Contact.id > -1)?'UPDATE':'SAVE';
		
		this.form = fb.group({
			id: [],
			contactType: [name, Validators.required],
			name: [name, Validators.required]
		});
		this.form.setValue(Contact);
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
