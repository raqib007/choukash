import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers/index';
import { Location } from '../../../model/location';

@Component({
  selector: 'app-location-create-form',
  templateUrl: './location-create-form.component.html',
  styleUrls: ['./location-create-form.component.scss']
})
export class LocationCreateFormComponent implements OnInit {
	selectedIndex = 0
	static id = 100;

	form: FormGroup;
	mode: 'create' | 'update' = 'create';

	constructor(@Inject(MAT_DIALOG_DATA) public defaults: any,
				private dialogRef: MatDialogRef<LocationCreateFormComponent>,
				private fb: FormBuilder,
				private store: Store<fromRoot.State>) {
	}

	ngOnInit() {
		if (this.defaults) {
			this.mode = 'update';
		} else {
			this.defaults = {} as Location;
		}

		this.form = this.fb.group({
			id: [LocationCreateFormComponent.id++],
			firstName: [this.defaults.firstName || '',],
			lastName: [this.defaults.lastName || ''],
			street: this.defaults.street || '',
			city: this.defaults.city || '',
			zipcode: this.defaults.zipcode || '',
			phoneNumber: this.defaults.phoneNumber || '',
		});
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
		const customer = this.form.value;
		customer.id = this.defaults.id;

		this.dialogRef.close(customer);
	}

	isCreateMode() {
		return this.mode === 'create';
	}

	isUpdateMode() {
		return this.mode === 'update';
	}
}

