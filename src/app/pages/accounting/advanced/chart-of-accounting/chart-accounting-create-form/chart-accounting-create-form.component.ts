import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { UserService,NotificationService,LocationService } from '../../../../../_services';
import { ChartAccount } from 'src/app/model';

@Component({
	selector: 'app-chart-accounting-create-form',
	templateUrl: './chart-accounting-create-form.component.html',
	styleUrls: ['./chart-accounting-create-form.component.scss']
})
export class ChartAccountingCreateFormComponent implements OnInit {
	formData = {
		inventory: '',
		part: '',
		noninventory: '',
		service: '',
		internal: '',
		capital: '',
		shipping: ''
	};
	
    form: FormGroup;
    title:string;
    btnTitle:string;
    showErrMsg = false;
    errMsg = '';

    strategyList = ['Add A Rounding Line','Modify Amount'];
	methodList = ['Up','Down','Half Up'];
	adjustList = ['Up','Down','Half Up'];
	
    selectedItems = [
        { user_group_id: '55c469b8-c5a3-11ea-b70f-1c1b0de07df2', user_group_name: 'Admin' },
        { user_group_id: '615bbf70-abd0-11ea-801f-1c1b0de07df2', user_group_name: 'Acountants' }
    ];

    constructor(
            private fb: FormBuilder,
            private userService : UserService,
            private locationService : LocationService,
            private notifyService : NotificationService,
			private dialogRef: MatDialogRef<ChartAccountingCreateFormComponent>,
			@Inject(MAT_DIALOG_DATA) chartAccount:ChartAccount 
		) {

        this.title = (chartAccount.name != '')?'Edit Account':'Add New Account';
		this.btnTitle = (chartAccount.name != '')?'UPDATE':'SAVE';
		
        this.form = fb.group({
            name: [name, Validators.required],
            type: [name, Validators.required],
            detail: [name, Validators.required],
            sub_account: [name, Validators.required]
        });
        // this.form.setValue(chartAccount);
    }
    ngOnInit() {
        // this.getUserGroupList();
        // this.getLocationType();
        // this.getLocationGroup();
    }
    // getUserGroupList(){
    //     this.userService.getAll()
	// 	.subscribe(
	// 		res => {
	// 			res = res.filter((item : any) => item.is_active == true);
	// 			this.userGroup = res.map(l => {
	// 				let data = {
	// 					user_group_id : l.user_group_id,
	// 					user_group_name : l.user_group_name
	// 				};
	// 				return data;
	// 			});
	// 		},
	// 		err => {
	// 			this.notifyService.showError(err, "User Group");
	// 		},
	// 		() => {

	// 		}
	// 	);
    // }
    // getLocationType(){
    //     this.locationService.getAllLocationType()
	// 	.subscribe(
	// 		res => {
	// 			res = res.filter((item : any) => item.is_active == true);
	// 			this.locationTypes = res.map(l => {
	// 				let data = {
	// 					location_type_id : l.location_type_id,
	// 					location_type_name : l.location_type_name
	// 				};
	// 				return data;
	// 			});
	// 		},
	// 		err => {
	// 			this.notifyService.showError(err, "Location Type");
	// 		},
	// 		() => {
	// 		}
	// 	);
    // }
    // getLocationGroup(){
    //     this.locationService.getAllLocationGroup()
	// 	.subscribe(
	// 		res => {
	// 			res = res.filter((item : any) => item.is_active == true);
	// 			this.locationGroup = res.map(l => {
	// 				let data = {
	// 					location_group_id : l.location_group_id,
	// 					location_group_name : l.location_group_name
	// 				};
	// 				return data;
	// 			});
	// 		},
	// 		err => {
	// 			this.notifyService.showError(err, "Location group");
	// 		},
	// 		() => {
	// 		}
	// 	);
    // }
    saveData() {
		// this.form.value.is_active = true;
        // if(this.form.value.name == ''){
        //     this.userService.saveUserData(this.form.value).subscribe((res : any) => {
        //         if(res.code == 200){
        //             this.dialogRef.close(this.form.value);
        //         }else{
        //             this.showErrMsg = true;
        //             this.errMsg = res.message;
        //         }
        //     });
        // }else{
        //     this.userService.updateUserData(this.form.value).subscribe((res : any) => {
        //         if(res.code == 200){
        //             this.dialogRef.close(this.form.value);
        //         }else{
        //             this.showErrMsg = true;
        //             this.errMsg = res.message;
        //         }
        //     });
		// }
		this.dialogRef.close(this.form.value);
    }
    close() {
        this.dialogRef.close();
    }
}