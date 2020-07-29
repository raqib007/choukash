import { Component, OnInit, Inject } from '@angular/core';
import { LocationService, NotificationService } from 'src/app/_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Location{
	location_type_id : string;
	location_type_name : string;
	description : string;
	is_active : boolean;
}

@Component({
	selector: 'app-location-type-create-form',
	templateUrl: './location-type-create-form.component.html',
	styleUrls: ['./location-type-create-form.component.scss']
})
export class LocationTypeCreateFormComponent implements OnInit {

	form: FormGroup;
    title:string;
	btnTitle:string;
	showErrMsg = false;
	errMsg = '';

    constructor(
		private fb: FormBuilder,
		private locationService : LocationService,
		private notifyService : NotificationService,
		private dialogRef: MatDialogRef<LocationTypeCreateFormComponent>,
		@Inject(MAT_DIALOG_DATA) location:Location
	) {

		this.title = (location.location_type_id != '')?'Edit Location Type':'Create New Location Type';
		this.btnTitle = (location.location_type_id != '')?'UPDATE':'SAVE';
		
		this.form = fb.group({
			location_type_id: [],
			location_type_name: [name, Validators.required,],
			description: [name],
			is_active: []
		});
		this.form.setValue(location);
    }
    ngOnInit(): void {
	}
	saveData() {
        if(this.form.value.location_type_id == ''){
            this.locationService.saveLocationTypeData(this.form.value).subscribe((res : any) => {
                if(res.code == 200){
                    this.dialogRef.close(this.form.value);
                }else{
                    this.showErrMsg = true;
                    this.errMsg = res.message;
                }
            });
        }else{
            this.locationService.updateLocationTypeData(this.form.value).subscribe((res : any) => {
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
