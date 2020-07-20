
import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { LocationGroup } from "../../../model";
import { LocationService } from 'src/app/_services';

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

	locationTypes = [
		{id:1,value:'Head Office'},
		{id:2,value:'Branches'},
		{id:3,value:'Consignments'},
		{id:4,value:'Warehouse'},
		{id:5,value:'In Transit'},
		{id:6,value:'Shipping'},
		{id:7,value:'Vendor (VMI)'}
    ];
    userGroups = [
		{id:1,value:'Name - ASH'},
		{id:2,value:'Name - BPR'},
		{id:3,value:'Name - ALJ'}
	];
    constructor(
            private fb: FormBuilder,
            private locationService: LocationService,
			private dialogRef: MatDialogRef<LocationGroupCreateFormComponent>,
			@Inject(MAT_DIALOG_DATA) locationGroup:LocationGroup 
		) {

        this.title = (locationGroup.location_group_id != '')?'Edit Location Group':'Add New Location Group';
        this.btnTitle = (locationGroup.location_group_id != '')?'UPDATE':'SAVE';
		
        this.form = fb.group({
            location_group_id: [],
            location_group_name: [name, Validators.required],
            location_type_id: [name, Validators.required],
            location_type_name: [name, Validators.required],
            description: [name, Validators.required],
            short_name: [name, Validators.required],
            is_active: [name],
            users: [name]
        });
        this.form.setValue(locationGroup);
    }
    ngOnInit() {
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
