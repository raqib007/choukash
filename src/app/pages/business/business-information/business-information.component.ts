import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { NotificationService,DropdownListService } from 'src/app/_services';
import { BusinessService } from 'src/app/_services/business.service';
import { first } from 'rxjs/operators';
import { Bussiness } from '../../../model';

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

    // businessTypes = ['Sole Proprietorship','Partnership','Limited Liability Company','Corporation','Nonprofit Organization'];
	// industryType = ['Fashion','Food and beverage','Beauty and cosmetics','Electronics and appliances','Furniture & Home Decor','Sports & recreation','General merchandise','Pharmacy','Service','Restaurants'];
	businessTypes = [];
	industryType = [];
	alignmentType = 1;

    constructor(
		private http: HttpClient,
		private notifyService : NotificationService,
		private dropdownService: DropdownListService,
		private businessService: BusinessService
		) {
    }
    ngOnInit(): void {
		this.getBusinessList();
		this.getIndustryList();
		this.getBusinessInfo();
	}
	getBusinessList(){
        this.dropdownService.getBusinessType()
		.subscribe(
			res => {
				this.businessTypes = res.map(l => {
					let data = {
						id : l.business_type_id,
						value : l.business_type_name
					};
					return data;
				});
			},
			err => {
				this.notifyService.showError(err, "Industry List");
			},
			() => {
			}
		);
	}
	getIndustryList(){
        this.dropdownService.getIndustryType()
		.subscribe(
			res => {
				this.industryType = res.map(l => {
					let data = {
						id : l.industry_id,
						value : l.industry_name
					};
					return data;
				});
			},
			err => {
				this.notifyService.showError(err, "Industry List");
			},
			() => {
			}
		);
	}
	getBusinessInfo(){
		this.businessService.getBusinessInfo()
		.pipe(first())
		.subscribe(
			res => {
				this.businessTypes = res.map(l => {
					return new Bussiness(l);
				});
			},
			err => {
				this.notifyService.showError(err, "Business Information");
			},
			() => {
			}
		);
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