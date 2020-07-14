import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { Contact } from '../../../model/contact';

@Component({
	selector: 'app-contact-list-create-form',
	templateUrl: './contact-list-create-form.component.html',
	styleUrls: ['./contact-list-create-form.component.scss']
})
export class ContactListCreateFormComponent implements OnInit {

	form: FormGroup;
    title:string;
	btnTitle:string;
	
    formData = {
		id: '',
		contactType: '',
		subContactType: '',
		bname: '',
		jobTitle: '',
		fname: '',
		lname: '',
		ltype: '',
		locationName: '',
		address: '',
		city: '',
		zipCode: '',
		country: '',
		phone: '',
		mobile: '',
		email: '',
		description: ''
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
	subContactType = [
		{id:1,value:'Retail'},
		{id:2,value:'Wholesale'},
		{id:3,value:'VIP'},
		{id:4,value:'Manager'},
		{id:5,value:'POS Operator'},
		{id:6,value:'Inventory Supervisor'},
		{id:7,value:'Delivery'},
		{id:8,value:'Suplier'},
		{id:9,value:'Consignments'},
		{id:10,value:'Warehouse Manager'},
		{id:11,value:'Picker'},
		{id:12,value:'Delivery'},
		{id:13,value:'Receiver'},
		{id:14,value:'Contact Person'},
		{id:15,value:'Accountant'},
		{id:16,value:'Inventory Manager'},
		{id:17,value:'Marketing Manager'},
		{id:18,value:'Delivery Fleet Manager'},
		{id:19,value:'Finance Manager'},
		{id:20,value:'Purchase Manager'},
		{id:21,value:'Sales Manager'},
		{id:22,value:'HR Manager'}
	];
	country = ['USA','Bangladesh'];
	locationType = ['USA','Bangladesh'];
	LocationName = ['USA','Bangladesh'];
	alignmentType = 1;

    constructor(
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<ContactListCreateFormComponent>,
		@Inject(MAT_DIALOG_DATA) Contact:Contact
		// @Inject(MAT_DIALOG_DATA) {id,contactType,subContactType,bname,jobTitle,fname,lname,ltype,locationName,address,city,zipCode,country,phone,mobile,email,description}:Contact 
	) {

		this.title = (Contact.id > -1)?'Edit Contact':'Add Contact';
		this.btnTitle = (Contact.id > -1)?'UPDATE':'SAVE';
		
		this.form = fb.group({
			id: [],
			contactType: [name, Validators.required],
			subContactType: [name, Validators.required],
			bname: [name, Validators.required],
			jobTitle: [name, Validators.required],
			fname: [name, Validators.required],
			lname: [name, Validators.required],
			ltype: [name, Validators.required],
			locationName: [name, Validators.required],
			address: [name, Validators.required],
			city: [name, Validators.required],
			zipCode: [name, Validators.required],
			country: [name, Validators.required],
			phone: [name, Validators.required],
			mobile: [name, Validators.required],
			email: [name, Validators.required],
			description: [name, Validators.required]
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

