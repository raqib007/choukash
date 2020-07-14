import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { User } from "../../../../model/user";
import { UserService } from '../../../../_services';

@Component({
    selector: 'app-user-create-form',
    templateUrl: './user-create-form.component.html',
    styleUrls: ['./user-create-form.component.scss']
})
export class UserCreateFormComponent implements OnInit {

    form: FormGroup;
    title:string;
    btnTitle:string;
    showErrMsg = false;
    errMsg = '';

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
            private userService : UserService,
			private dialogRef: MatDialogRef<UserCreateFormComponent>,
			@Inject(MAT_DIALOG_DATA) user:User 
		) {

        this.title = (user.user_id != '')?'Edit User Group':'Add New User Group';
        this.btnTitle = (user.user_id != '')?'UPDATE':'SAVE';
		
        this.form = fb.group({
            first_name: [name, Validators.required],
            last_name: [name, Validators.required],
            user_name: [name, Validators.required],
            note: [name, Validators.required],
            location_type_id: [name, Validators.required],
            location_type_name: [name, Validators.required],
            mobile: [name, Validators.required],
            email: [name, Validators.required],
            user_id: [name, Validators.required],
            password: [name, Validators.required],
            user_group: [name, Validators.required],
            is_active: [name, Validators.required]
        });
        this.form.setValue(user);
    }
    ngOnInit() {
    }
    saveData() {
        this.form.value.is_active = true;
        console.log('user data ',this.form.value);
        if(this.form.value.user_id == ''){
            this.userService.saveUserData(this.form.value).subscribe((res : any) => {
                console.log('Response = ',res);
                if(res.code == 200){
                    this.dialogRef.close(this.form.value);
                }else{
                    this.showErrMsg = true;
                    this.errMsg = res.message;
                }
            });
        }else{
            this.userService.updateUserData(this.form.value).subscribe((res : any) => {
                console.log('Response in update = ',res);
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
