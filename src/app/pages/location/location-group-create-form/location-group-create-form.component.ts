
import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { LocationGroup } from "../../../model";
import { LocationService, NotificationService } from 'src/app/_services';

@Component({
	selector: 'app-location-group-create-form',
	templateUrl: './location-group-create-form.component.html',
	styleUrls: ['./location-group-create-form.component.scss']
})
export class LocationGroupCreateFormComponent implements OnInit {

    form: FormGroup;
    title:string;
    btnTitle:string;
    showErrMsg = false;
    errMsg = '';

	locationTypes = [];
    constructor(
            private fb: FormBuilder,
            private locationService: LocationService,
            private notifyService : NotificationService,
			private dialogRef: MatDialogRef<LocationGroupCreateFormComponent>,
			@Inject(MAT_DIALOG_DATA) locationGroup:LocationGroup 
		) {
            console.log(LocationGroup);
        locationGroup.is_active = true;
        this.title = (locationGroup.location_group_id != '')?'Edit Location Group':'Add New Location Group';
        this.btnTitle = (locationGroup.location_group_id != '')?'UPDATE':'SAVE';
        this.form = fb.group({
            location_group_id: [],
            location_group_name: [name, Validators.required],
            location_type_id: [name, Validators.required],
            location_type_name: [name],
            description: [name],
            short_name: [name],
            is_active: [name]
        });
        this.form.setValue(locationGroup);
    }
    ngOnInit() {
        this.getLocationType();
    }
    /*** Get Location Type Data ***/

    getLocationType(){
        this.locationService.getAllLocationType()
		.subscribe(
			res => {
				res = res.filter((item : any) => item.is_active == true);
				this.locationTypes = res.map(l => {
					let data = {
						id : l.location_type_id,
						value : l.location_type_name
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
        if(this.form.value.location_group_id == ''){
            this.locationService.saveLocationGroupData(this.form.value).subscribe((res : any) => {
                console.log('Response = ',res);
                if(res.code == 200){
                    this.dialogRef.close(this.form.value);
                }else{
                    this.showErrMsg = true;
                    this.errMsg = res.message;
                }
            });
        }else{
            this.locationService.updateLocationGroupData(this.form.value).subscribe((res : any) => {
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
