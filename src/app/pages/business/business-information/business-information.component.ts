import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
	selector: 'app-business-information',
	templateUrl: './business-information.component.html',
	styleUrls: ['./business-information.component.scss']
})
export class BusinessInformationComponent implements OnInit {

	fileData: File = null;
	previewUrl:any = null;
	
    formData = {
		bname: '',
		authority: '',
		fname: '',
		lname: '',
		lgroup: '',
		address: '',
		zip: '',
		city: '',
		country: '',
		phone: '',
		mobile: '',
		email: '',
		website: '',
		ctype: '',
		cstype: '',
	};

    businessTypes = ['Sole Proprietorship','Partnership','Limited Liability Company','Corporation','Nonprofit Organization'];
	industryType = ['Fashion','Food and beverage','Beauty and cosmetics','Electronics and appliances','Furniture & Home Decor','Sports & recreation','General merchandise','Pharmacy','Service','Restaurants'];
	alignmentType = 1;

    constructor(private http: HttpClient) {
    }
    ngOnInit(): void {
	}
	
	onSelectFile(event) {
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = (event) => { 
				this.previewUrl = event.target.result;
			}
		  }
	}

  	onSubmit() {	
  	}

}