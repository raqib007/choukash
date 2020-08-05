import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { NotificationService,DropdownListService } from 'src/app/_services';
import { BusinessService } from 'src/app/_services/business.service';
import { first,take } from 'rxjs/operators';
import { Bussiness } from '../../../model';
import * as _ from 'lodash';

@Component({
	selector: 'app-business-information',
	templateUrl: './business-information.component.html',
	styleUrls: ['./business-information.component.scss']
})
export class BusinessInformationComponent implements OnInit {

	fileData: File = null;
	previewUrl:any = null;
	formData = {} as Bussiness;

    // businessTypes = ['Sole Proprietorship','Partnership','Limited Liability Company','Corporation','Nonprofit Organization'];
	// industryType = ['Fashion','Food and beverage','Beauty and cosmetics','Electronics and appliances','Furniture & Home Decor','Sports & recreation','General merchandise','Pharmacy','Service','Restaurants'];
	businessInfo = [];
	businessTypes = [];
	industryType = [];
	alignmentType = 1;

	imageError: string;
    isImageSaved: boolean;
	cardImageBase64: string;
	hasValue: boolean = false;

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
		.subscribe(
			res => {
				this.businessInfo = res.map(l => {
					return new Bussiness(l);
				});
			},
			err => {
				this.notifyService.showError(err, "Business Information");
			},
			() => {
				if(this.businessInfo.length > 0){
					this.formData = this.businessInfo[0];
					this.hasValue = true;
					this.isImageSaved = true;
					this.cardImageBase64 = this.formData.company_logo;
					this.formData.date_of_establishment = new Date(this.formData.date_of_establishment);
				}
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
	fileChangeEvent(fileInput: any) {
        this.imageError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {
            // Size Filter Bytes
            const max_size = 20971520;
            const allowed_types = ['image/png', 'image/jpeg'];
            const max_height = 15200;
            const max_width = 25600;

            if (fileInput.target.files[0].size > max_size) {
                this.imageError =
                    'Maximum size allowed is ' + max_size / 1000 + 'Mb';

                return false;
            }

            if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
                this.imageError = 'Only Images are allowed ( JPG | PNG )';
                return false;
            }
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    const img_height = rs.currentTarget['height'];
                    const img_width = rs.currentTarget['width'];
                    console.log(img_height, img_width);
                    if (img_height > max_height && img_width > max_width) {
                        this.imageError =
                            'Maximum dimentions allowed ' +
                            max_height +
                            '*' +
                            max_width +
                            'px';
                        return false;
                    } else {
                        const imgBase64Path = e.target.result;
                        this.cardImageBase64 = imgBase64Path;
						this.isImageSaved = true;
						this.formData.company_logo = imgBase64Path;
                    }
                };
			};
            reader.readAsDataURL(fileInput.target.files[0]);
        }
	}
	removeImage() {
        this.cardImageBase64 = null;
        this.isImageSaved = false;
    }

	saveData() {
		console.log(this.formData.date_of_establishment);	
		this.businessService.saveBusinessData(this.formData).subscribe((res : any) => {
			if(res.code == 200){
				this.notifyService.showSuccess("Business inforamtion has been successfully saved!!", "Business Information");
				this.hasValue = true;
			}else{
				this.notifyService.showError("Business inforamtion has been successfully saved!!", "Business Information");
			}
		});
	}
	updateData() {
		console.log(this.formData.date_of_establishment);
		this.businessService.updateBusinessData(this.formData).subscribe((res : any) => {
			if(res.code == 200){
				this.notifyService.showSuccess("Business inforamtion has been successfully updated!!", "Business Information");
			}else{
				this.notifyService.showError("Business inforamtion has been successfully updated!!", "Business Information");
			}
		});	
	}
}