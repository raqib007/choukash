import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { User } from "../../../../model/user";

@Component({
    selector: 'app-user-create-form',
    templateUrl: './user-create-form.component.html',
    styleUrls: ['./user-create-form.component.scss']
})
export class UserCreateFormComponent implements OnInit {

    form: FormGroup;
    title:string;
    btnTitle:string;

    locationTypes = [
		{id:1,value:'Location Type One'},
		{id:2,value:'Location Type Two'},
		{id:3,value:'Location Type Three'}
	];
	locationGroup = [
		{id:1,value:'Location Group One'},
		{id:2,value:'Location Group Two'},
		{id:3,value:'Location Group Three'}
	];
	userGroup = [
		{id:1,value:'Group One'},
		{id:2,value:'Group Two'},
		{id:3,value:'Group Three'}
	];

    constructor(
			private fb: FormBuilder,
			private dialogRef: MatDialogRef<UserCreateFormComponent>,
			@Inject(MAT_DIALOG_DATA) {id,fname,lname,uname,description,ltype,lgroup,mobile,email,uid,password,ugroupid}:User 
		) {

        this.title = (id > -1)?'Edit User Group':'Add New User Group';
        this.btnTitle = (id > -1)?'UPDATE':'SAVE';
		
        this.form = fb.group({
            name: [name, Validators.required],
            fname: [name, Validators.required],
            lname: [name, Validators.required],
            uname: [name, Validators.required],
            description: [name, Validators.required],
            ltype: [name, Validators.required],
            lgroup: [name, Validators.required],
            mobile: [name, Validators.required],
            email: [name, Validators.required],
            uid: [name, Validators.required],
            password: [name, Validators.required],
            ugroupid: [name, Validators.required]
        });
    }
    ngOnInit() {
    }
    save() {
        this.dialogRef.close(this.form.value);
    }
    close() {
        this.dialogRef.close();
    }

}
