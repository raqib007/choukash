import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { ContactGroup } from '../../../model/contact-group';
import { ContactService, DropdownListService, NotificationService } from 'src/app/_services';

@Component({
	selector: 'app-contact-sub-group-create-form',
	templateUrl: './contact-sub-group-create-form.component.html',
	styleUrls: ['./contact-sub-group-create-form.component.scss']
})
export class ContactSubGroupCreateFormComponent implements OnInit {

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
	contactType = [];
    constructor(
		private fb: FormBuilder,
		private contactService : ContactService,
		private notifyService : NotificationService,
		private dropdownService : DropdownListService,
		private dialogRef: MatDialogRef<ContactSubGroupCreateFormComponent>,
		@Inject(MAT_DIALOG_DATA) Contact:ContactGroup
	) {

		this.title = (Contact.contact_sub_group_id != '')?'Edit Contact Sub Group':'Create New Contact Sub Group';
		this.btnTitle = (Contact.contact_sub_group_id != '')?'UPDATE':'SAVE';
		
		this.form = fb.group({
			contact_sub_group_id: [],
			contact_sub_group_name: [name, Validators.required,],
			contact_type_id: [name, Validators.required],
			contact_type_name: [name],
			is_active: [],
			properties: [],
			description: [],
		});
		this.form.setValue(Contact);
    }
    ngOnInit(): void {
		this.dropdownService.getContactType()
		.subscribe(
			res => {
				this.contactType = res.map(l => {
					let data = {
						id : l.contact_type_id,
						value : l.contact_type_name
					};
					return data;
				});
			},
			err => {
				this.notifyService.showError(err, "User Group");
			},
			() => {
			}
		);
	}

	saveData() {
        this.form.value.is_active = true;
        if(this.form.value.contact_sub_group_id == ''){
            this.contactService.saveContactGroupData(this.form.value).subscribe((res : any) => {
                if(res.code == 200){
                    this.dialogRef.close(this.form.value);
                }else{
                    this.showErrMsg = true;
                    this.errMsg = res.message;
                }
            });
        }else{
            this.contactService.updateContactGroupData(this.form.value).subscribe((res : any) => {
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
}
