import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { UserService,NotificationService,LocationService } from '../../../../_services';
import { User } from 'src/app/model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

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

    locationTypes = [];
	locationGroup = [];
    userGroup = [];
    dropdownList = [];
    dropdownSettings:IDropdownSettings;
    selectedItems = [
        { user_group_id: '55c469b8-c5a3-11ea-b70f-1c1b0de07df2', user_group_name: 'Admin' },
        { user_group_id: '615bbf70-abd0-11ea-801f-1c1b0de07df2', user_group_name: 'Acountants' }
    ];

    constructor(
            private fb: FormBuilder,
            private userService : UserService,
            private locationService : LocationService,
            private notifyService : NotificationService,
			private dialogRef: MatDialogRef<UserCreateFormComponent>,
			@Inject(MAT_DIALOG_DATA) user:User 
		) {

        this.title = (user.user_id != '')?'Edit User':'Add New User';
        this.btnTitle = (user.user_id != '')?'UPDATE':'SAVE';
		user.user_group = this.selectedItems;
        this.form = fb.group({
            first_name: [name, Validators.required],
            last_name: [name, Validators.required],
            user_name: [name, Validators.required],
            note: [name, Validators.required],
            location_type_id: [name, Validators.required],
            location_group_id: [name, Validators.required],
            location_type_name: [name, Validators.required],
            location_group_name: [name, Validators.required],
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
        this.getUserGroupList();
        this.getLocationType();
        this.getLocationGroup();

		this.dropdownSettings = {
			singleSelection: false,
			idField: 'user_group_id',
			textField: 'user_group_name',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 2,
			allowSearchFilter: true
		};
    }
    getUserGroupList(){
        this.userService.getAll()
		.subscribe(
			res => {
				res = res.filter((item : any) => item.is_active == true);
				this.userGroup = res.map(l => {
					let data = {
						user_group_id : l.user_group_id,
						user_group_name : l.user_group_name
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
    getLocationType(){
        this.locationService.getAllLocationType()
		.subscribe(
			res => {
				res = res.filter((item : any) => item.is_active == true);
				this.locationTypes = res.map(l => {
					let data = {
						location_type_id : l.location_type_id,
						location_type_name : l.location_type_name
					};
					return data;
				});
			},
			err => {
				this.notifyService.showError(err, "Location Type");
			},
			() => {
			}
		);
    }
    getLocationGroup(){
        this.locationService.getAllLocationGroup()
		.subscribe(
			res => {
				res = res.filter((item : any) => item.is_active == true);
				this.locationGroup = res.map(l => {
					let data = {
						location_group_id : l.location_group_id,
						location_group_name : l.location_group_name
					};
					return data;
				});
			},
			err => {
				this.notifyService.showError(err, "Location group");
			},
			() => {
			}
		);
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

    /** For MultiSelect  **/
    onItemSelect(item: any) {
		console.log(item);
	}
	onSelectAll(items: any) {
		console.log(items);
	}

}
