import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { ContactService, DropdownListService, NotificationService } from 'src/app/_services';

@Component({
	selector: 'app-contact-list-create-form',
	templateUrl: './contact-list-create-form.component.html',
	styleUrls: ['./contact-list-create-form.component.scss']
})
export class ContactListCreateFormComponent implements OnInit {

	form: FormGroup;
    title:string;
	btnTitle:string;
	showErrMsg = false;
	errMsg = '';

	// contactType = [
	// 	{id:1,value:'Customers'},
	// 	{id:2,value:'Consignment Contact'},
	// 	{id:3,value:'Branch Contact'},
	// 	{id:4,value:'Vendor Contact'},
	// 	{id:5,value:'Warehouse Contact'},
	// 	{id:6,value:'Shipping Contact'},
	// 	{id:7,value:'Head Office Contact'}
	// ];
	// subContactType = [
	// 	{id:1,value:'Retail'},
	// 	{id:2,value:'Wholesale'},
	// 	{id:3,value:'VIP'},
	// 	{id:4,value:'Manager'},
	// 	{id:5,value:'POS Operator'},
	// 	{id:6,value:'Inventory Supervisor'},
	// 	{id:7,value:'Delivery'},
	// 	{id:8,value:'Suplier'},
	// 	{id:9,value:'Consignments'},
	// 	{id:10,value:'Warehouse Manager'},
	// 	{id:11,value:'Picker'},
	// 	{id:12,value:'Delivery'},
	// 	{id:13,value:'Receiver'},
	// 	{id:14,value:'Contact Person'},
	// 	{id:15,value:'Accountant'},
	// 	{id:16,value:'Inventory Manager'},
	// 	{id:17,value:'Marketing Manager'},
	// 	{id:18,value:'Delivery Fleet Manager'},
	// 	{id:19,value:'Finance Manager'},
	// 	{id:20,value:'Purchase Manager'},
	// 	{id:21,value:'Sales Manager'},
	// 	{id:22,value:'HR Manager'}
	// ];
	locationType = [];
	locationGroup = [];
	contactType = [];
	subContactType = [];
	alignmentType = 1;
	country = [];

	addressList = [];
	addressType = [
		{name:'Invoice Address',value:'Invoice'},
		{name:'Shipping Address',value:'Delivery'}
	];

    constructor(
		private fb: FormBuilder,
		private contactService : ContactService,
		private dropdownService : DropdownListService,
		private notifyService : NotificationService,
		private dialogRef: MatDialogRef<ContactListCreateFormComponent>,
		@Inject(MAT_DIALOG_DATA) pass_data:any,
	) {
		const contact = pass_data.contact;
		this.locationType = pass_data.locationType;
		this.locationGroup = pass_data.locationGroup;
		this.contactType = pass_data.contactType;
		this.subContactType = pass_data.subContactType;
		this.country = pass_data.country;

		this.title = (contact.contact_id != '')?'Edit Contact':'Add Contact';
		this.btnTitle = (contact.contact_id != '')?'UPDATE':'SAVE';
		this.form = fb.group({
			contact_id: [],
			address_type: [],
			contact_type_id: [],
			contact_type_name: [name, Validators.required],
			contact_sub_group_id: [name, Validators.required],
			contact_sub_group_name: [],
			first_name: [name, Validators.required],
			last_name: [name, Validators.required],
			business_name: [name, Validators.required],
			job_title: [name, Validators.required],
			location_type_id: [name, Validators.required],
			location_type_name: [],
			location_group_id: [name, Validators.required],
			location_group_name: [],
			open_address: [name, Validators.required],
			zip: [name, Validators.required],
			city: [name, Validators.required],
			country: [name, Validators.required],
			mobile: [name, Validators.required],
			telephone: [name, Validators.required],
			email: [name, Validators.required],
			website: [name, Validators.required],
			is_active: [],
			company_id: [],
			note: [],
			is_owner: []
		});
		this.form.setValue(contact);
    }
    ngOnInit(): void {
	}
	save() {
		this.form.value.is_active = true;
		const pass_data = [];
		pass_data.push(this.form.value);
		console.log(pass_data);
        if(this.form.value.contact_id == ''){
            this.contactService.saveContactData(pass_data).subscribe((res : any) => {
                if(res.code == 200){
                    this.dialogRef.close(this.form.value);
                }else{
                    this.showErrMsg = true;
                    this.errMsg = res.message;
                }
            });
        }else{
            this.contactService.updateContactData(pass_data).subscribe((res : any) => {
                if(res.code == 200){
                    this.dialogRef.close(this.form.value);
                }else{
                    this.showErrMsg = true;
                    this.errMsg = res.message;
                }
            });
        }
    }
    close() {
        this.dialogRef.close();
	}
	
	addAddress(){
		this.addressList.push({
			address_type : '',
			open_address : '',
			zip : '',
			city : '',
			country : '',
			mobile : '',
			telephone : '',
			email : '',
			website : ''
		});
	}
	removeAddress(){
		this.addressList.splice(this.addressList.length-1, 1);
	}
}

