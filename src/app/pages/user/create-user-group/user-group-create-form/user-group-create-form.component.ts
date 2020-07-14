
import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { UserGroup } from "../../../../model/";
import { UserService } from '../../../../_services';

@Component({
  selector: 'app-user-group-create-form',
  templateUrl: './user-group-create-form.component.html',
  styleUrls: ['./user-group-create-form.component.scss']
})
export class UserGroupCreateFormComponent implements OnInit {
	
    form: FormGroup;
    title:string;
    btnTitle:string;
    showErrMsg = false;
    errMsg = '';
    constructor(
            private fb: FormBuilder,
            private userService : UserService,
			private dialogRef: MatDialogRef<UserGroupCreateFormComponent>,
			@Inject(MAT_DIALOG_DATA) userGroup:UserGroup 
		) {

		this.title = (userGroup.user_group_id != '')?'Edit User Group':'Add New User Group';
		this.btnTitle = (userGroup.user_group_id != '')?'UPDATE':'SAVE';
		
        this.form = fb.group({
            user_group_id: [name],
            user_group_name: [name, Validators.required],
            note: [name, Validators.required],
            is_active: [name]
        });
        this.form.setValue(userGroup);
    }

    ngOnInit() {
    }

    saveData() {
        this.form.value.is_active = true;
        if(this.form.value.user_group_id == ''){
            this.userService.saveUserGroupData(this.form.value).subscribe((res : any) => {
                console.log('Response = ',res);
                if(res.code == 200){
                    this.dialogRef.close(this.form.value);
                }else{
                    this.showErrMsg = true;
                    this.errMsg = res.message;
                }
            });
        }else{
            this.userService.updateUserGroupData(this.form.value).subscribe((res : any) => {
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
