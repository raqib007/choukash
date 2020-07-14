import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss']
})
export class LocationDetailsComponent implements OnInit {
    form: FormGroup;
    constructor(private fb: FormBuilder) { 

		// this.form = fb.group({
        //     price: [],
        //     freight: [],
        //     currency: [],
        //     account: [],
        //     tax: [],
        //     storeNumber: []
        // });
	}

    ngOnInit(): void {
    }

}
