// import { Component, Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Store } from '@ngrx/store';
// import * as fromRoot from '../../../reducers/index';
// import { Location } from '../../../model';
// import { LocationService, NotificationService } from 'src/app/_services';


import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { Location } from "../../../model";
import { LocationService, NotificationService } from 'src/app/_services';


@Component({
	selector: 'app-location-create-form',
	templateUrl: './location-create-form.component.html',
	styleUrls: ['./location-create-form.component.scss']
})
export class LocationCreateFormComponent implements OnInit {
	selectedIndex = 0
	static id = 100;

	form: FormGroup;
	title: string;
    btnTitle: string;
    showErrMsg = false;
    errMsg = '';
	mode: 'create' | 'update' = 'create';
	locationData : any;

	dropdownList = {
		locationGroups : [],
		locationList : [],
		countryList : []
	};

	constructor(
			// private fb: FormBuilder,
			// private dialogRef: MatDialogRef<LocationCreateFormComponent>,
			// private store: Store<fromRoot.State>,
			// @Inject(MAT_DIALOG_DATA) public defaults: any

			private fb: FormBuilder,
            private locationService: LocationService,
            private notifyService : NotificationService,
			private dialogRef: MatDialogRef<LocationCreateFormComponent>,
			@Inject(MAT_DIALOG_DATA) location:Location 
		) {
			this.locationData = location;
			if (location.location_id != '') {
				this.mode = 'update';
			} else {
				this.mode = 'create';
			}
	}

	ngOnInit() {
		this.getLocationType();
		this.getLocationGroup();
		this.getCountry();

		// this.form = this.fb.group({
		// 	id: [LocationCreateFormComponent.id++],
		// 	firstName: [this.defaults.firstName || '',],
		// 	lastName: [this.defaults.lastName || ''],
		// 	street: this.defaults.street || '',
		// 	city: this.defaults.city || '',
		// 	zipcode: this.defaults.zipcode || '',
		// 	phoneNumber: this.defaults.phoneNumber || '',
		// });

        // this.title = (location.location_id != '')?'Edit Location Group':'Add New Location Group';
		// this.btnTitle = (location.location_id != '')?'UPDATE':'SAVE';
		
		// this.form = this.fb.group({
        //     location_id : [],
		// 	address_type : [],
		// 	location_group_id : [],
		// 	location_group_name : [],
		// 	location_type_id : [],
		// 	location_type_name : [],
		// 	business_name : [],
		// 	job_title : [],
		// 	first_name : [],
		// 	last_name : [],
		// 	open_address : [],
		// 	zip : [],
		// 	city : [],
		// 	country : [],
		// 	telephone : [],
		// 	mobile : [],
		// 	email : [],
		// 	company_id : [],
		// 	contact_sub_group_id : [],
		// 	contact_type_id : [],
		// 	is_active: [],
		// 	location_code : [],
		// 	website : []
		// });
		// this.form.setValue(location);
	}
	
	/** get location type list **/
	getLocationType(){
        this.locationService.getAllLocationType()
		.subscribe(
			res => {
				res = res.filter((item : any) => item.is_active == true);
				this.dropdownList.locationList = res.map(l => {
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
	/** get location group list **/
	getLocationGroup(){
        this.locationService.getAllLocationGroup()
		.subscribe(
			res => {
				res = res.filter((item : any) => item.is_active == true);
				this.dropdownList.locationGroups = res.map(l => {
					let data = {
						id : l.location_group_id,
						value : l.location_group_name
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
	/** get country list **/
	getCountry(){
		this.locationService.getCountryList()
		.subscribe(
			res => {
				this.dropdownList.countryList = res.map(l => {
					let data = {
						code : l.alpha2Code,
						name : l.name
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

	save() {
		if (this.mode === 'create') {
			this.createCustomer();
		} else if (this.mode === 'update') {
			this.updateCustomer();
		}
	}

	createCustomer() {
		const customer = this.form.value;
		this.dialogRef.close(customer);
	}

	updateCustomer() {
		// const customer = this.form.value;
		// customer.id = this.defaults.id;

		this.dialogRef.close(location);
	}

	isCreateMode() {
		return this.mode === 'create';
	}

	isUpdateMode() {
		return this.mode === 'update';
	}
}

