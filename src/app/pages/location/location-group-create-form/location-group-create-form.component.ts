
import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { LocationGroup } from "../../../model/location-group";

@Component({
	selector: 'app-location-group-create-form',
	templateUrl: './location-group-create-form.component.html',
	styleUrls: ['./location-group-create-form.component.scss']
})
export class LocationGroupCreateFormComponent implements OnInit {

    form: FormGroup;
    title:string;
    btnTitle:string;

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
			private dialogRef: MatDialogRef<LocationGroupCreateFormComponent>,
			@Inject(MAT_DIALOG_DATA) {id,locationName,description,type,shortName,users}:LocationGroup 
		) {

        this.title = (id > -1)?'Edit Location Group':'Add New Location Group';
        this.btnTitle = (id > -1)?'UPDATE':'SAVE';
		
        this.form = fb.group({
            locationName: [name, Validators.required],
            description: [name, Validators.required],
            type: [name, Validators.required],
            shortName: [name, Validators.required],
            users: [name]
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
