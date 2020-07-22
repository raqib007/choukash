import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { UserService,NotificationService,LocationService } from '../../../../../_services';

export interface PaymentTerm {
	name: string;
	currency: string;
}
@Component({
	selector: 'app-cost-price-form',
	templateUrl: './cost-price-form.component.html',
	styleUrls: ['./cost-price-form.component.scss']
})

export class CostPriceFormComponent implements OnInit {
    form: FormGroup;
    title:string;
    btnTitle:string;
    showErrMsg = false;
    errMsg = '';
    currencyList = ['USD','GBP'];

    constructor(
            private fb: FormBuilder,
            private userService : UserService,
            private locationService : LocationService,
            private notifyService : NotificationService,
			private dialogRef: MatDialogRef<CostPriceFormComponent>,
			@Inject(MAT_DIALOG_DATA) paymentTerm:PaymentTerm 
		) {

        this.title = (paymentTerm.name != '')?'Edit Cost Price Group':'Add Cost Price Group';
		this.btnTitle = (paymentTerm.name != '')?'UPDATE':'SAVE';
		
        this.form = fb.group({
            name: [name, Validators.required],
            currency: [name, Validators.required]
        });
        this.form.setValue(paymentTerm);
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
        if(this.form.value.user_id == ''){
            this.userService.saveUserData(this.form.value).subscribe((res : any) => {
                if(res.code == 200){
                    this.dialogRef.close(this.form.value);
                }else{
                    this.showErrMsg = true;
                    this.errMsg = res.message;
                }
            });
        }else{
            this.userService.updateUserData(this.form.value).subscribe((res : any) => {
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
