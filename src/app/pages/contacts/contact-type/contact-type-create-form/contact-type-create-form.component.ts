import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { ContactService, DropdownListService, NotificationService } from 'src/app/_services';

export interface Contact{
	contact_type_id : string;
	contact_type_name : string;
	description : string;
	is_active : boolean;
}

@Component({
	selector: 'app-contact-type-create-form',
	templateUrl: './contact-type-create-form.component.html',
	styleUrls: ['./contact-type-create-form.component.scss']
})
export class ContactTypeCreateFormComponent implements OnInit {

	form: FormGroup;
    title:string;
	btnTitle:string;
	showErrMsg = false;
	errMsg = '';

	contactType = [];
    constructor(
		private fb: FormBuilder,
		private contactService : ContactService,
		private notifyService : NotificationService,
		private dropdownService : DropdownListService,
		private dialogRef: MatDialogRef<ContactTypeCreateFormComponent>,
		@Inject(MAT_DIALOG_DATA) Contact:Contact
	) {

		this.title = (Contact.contact_type_id != '')?'Edit Contact Type':'Create New Contact Type';
		this.btnTitle = (Contact.contact_type_id != '')?'UPDATE':'SAVE';
		
		this.form = fb.group({
			contact_type_id: [],
			contact_type_name: [name, Validators.required,],
			description: [name],
			is_active: []
		});
		this.form.setValue(Contact);
    }
    ngOnInit(): void {
	}
	saveData() {
        if(this.form.value.contact_type_id == ''){
            this.contactService.saveContactTypeData(this.form.value).subscribe((res : any) => {
                if(res.code == 200){
                    this.dialogRef.close(this.form.value);
                }else{
                    this.showErrMsg = true;
                    this.errMsg = res.message;
                }
            });
        }else{
            this.contactService.updateContactTypeData(this.form.value).subscribe((res : any) => {
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