import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OwnerInfoCreateFormComponent } from './owner-info-create-form/owner-info-create-form.component';
import { ContactService, DropdownListService, NotificationService } from 'src/app/_services';
import { Contact } from 'src/app/model';
import * as _ from 'lodash';

@Component({
	selector: 'app-owner-information',
	templateUrl: './owner-information.component.html',
	styleUrls: ['./owner-information.component.scss']
})
export class OwnerInformationComponent implements OnInit {
	showAddress = false;
	fileData: File = null;
	previewUrl:any = null;

	addressList: Contact[];
	locationType = [];
	locationGroup = [];
	contactType = [];
	subContactType = [];
	country = [];

	showHeadForm: boolean = false;
	showDefaultForm: boolean = false;
	showInvoicetForm: boolean = false;
	showShippingForm: boolean = false;
	allData : any;


	imageError: string = '' ;
    isImageSaved: boolean = false;
    isLoading: boolean = false;
	cardImageBase64: string = '' ;

	constructor(
		private dialog: MatDialog,
		private contactService : ContactService,
		private dropdownService : DropdownListService,
		private notifyService : NotificationService
	) {
	}
	ngOnInit(): void {
		this.getOwnerInfo();
		this.getLocationGroup();
		this.getContactType();
		this.getContactGroup();
		this.getCountry();
	}
	getOwnerInfo(){
		this.contactService.getAllOwnerInfo()
		.subscribe(
			res => {
				res = res.filter((item : any) => item.is_active == true && item.is_owner == true);
				this.addressList = res.map(l => new Contact(l));
			},
			err => {
				this.notifyService.showError(err, "Owner Information");
			},
			() => {
				if(this.addressList.length > 0){
					this.showAddress = true;
				}
			}
		);
	}
	/** get location type list **/
	getLocationType(){
        this.dropdownService.getLocationType()
		.subscribe(
			res => {
				this.locationType = res.map(l => {
					let data = {
						id : l.location_type_id,
						value : l.location_type_name
					};
					return data;
				});
			},
			err => {
				this.notifyService.showError(err, "Location Type");
			},
			() => {
			}
		);
	}
	/** get location group list **/
	getLocationGroup(){
        this.dropdownService.getLocationGroup()
		.subscribe(
			res => {
				this.locationGroup = res.map(l => {
					let data = {
						id : l.location_group_id,
						value : l.location_group_name
					};
					return data;
				});
			},
			err => {
				this.notifyService.showError(err, "Location Group");
			},
			() => {
			}
		);
	}
	/** get contact type list **/
	getContactType(){
        this.dropdownService.getContactType()
		.subscribe(
			res => {
				this.contactType = res.map(l => {
					let data = {
						id : l.contact_type_id,
						value : l.contact_type_name
					};
					return data;
				});
			},
			err => {
				this.notifyService.showError(err, "Contact Type");
			},
			() => {
			}
		);
	}
	/** get contact group list **/
	getContactGroup(){
        this.dropdownService.getContactGroup()
		.subscribe(
			res => {
				this.subContactType = res.map(l => {
					let data = {
						id : l.contact_sub_group_id,
						value : l.contact_sub_group_name
					};
					return data;
				});
			},
			err => {
				this.notifyService.showError(err, "Contact Group");
			},
			() => {
			}
		);
	}
	/** get country list **/
	getCountry(){
		this.dropdownService.getCountryList()
		.subscribe(
			res => {
				this.country = res.map(l => {
					let data = {
						code : l.alpha2Code,
						name : l.name
					};
					return data;
				});
			},
			err => {
				this.notifyService.showError(err, "Country");
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
	createContact(){
		const pass_data = {
			addressList : this.addressList,
			locationType : this.locationType,
			locationGroup : this.locationGroup,
			contactType : this.contactType,
			subContactType : this.subContactType,
			countryList : this.country
		};
		this.dialog.open(OwnerInfoCreateFormComponent, { 
			panelClass: 'custom-dialog-container',
			data: pass_data,
			autoFocus : true,
			maxWidth : '100vw',
			width : '80vw'
		}).afterClosed().subscribe(
			val => {
				if(val != 'no'){
					this.notifyService.showSuccess("Owner's contact inforamtion has been successfully saved!!", "Owner's Information");
					this.getOwnerInfo();
				}
			}
		);
	}

	editDefault(val){
		if(val == 0){
			this.showHeadForm = !this.showHeadForm;
		}else if(val == 1){
			this.showDefaultForm = !this.showDefaultForm;
		}else if(val == 2){
			this.showInvoicetForm = !this.showInvoicetForm;
		}else{
			this.showShippingForm = !this.showShippingForm;
		}
		this.allData = {
			type:val,
			addressList : this.addressList,
			locationType : this.locationType,
			locationGroup : this.locationGroup,
			contactType : this.contactType,
			subContactType : this.subContactType,
			countryList : this.country
		};
	}

	updateAddress(val){
		let pass_data = this.addressList[0];
		if(val == 0){
			pass_data = this.addressList[0];
		}else if(val == 1){
			pass_data = this.addressList[0];
		}else if(val == 2){
			pass_data = this.addressList[1];
		}else{
			pass_data = this.addressList[2];
		}
		this.contactService.updateSingleContactData(pass_data).subscribe((res : any) => {
			if(res.code == 200){
				if(val == 0){
					this.showHeadForm = false;
				}else if(val == 1){
					this.showDefaultForm = false;
				}else if(val == 2){
					this.showInvoicetForm = false;
				}else{
					this.showShippingForm = false;
				}
				this.notifyService.showSuccess("Owner's contact inforamtion has been successfully updated!!", "Owner's Information");
				this.getOwnerInfo();
			}else{
				this.notifyService.showError("Owner's contact inforamtion has been successfully updated!!", "Owner's Information");
			}
		});
	}

	fileChangeEvent(fileInput: any) {
		this.isLoading = true;
        this.imageError = null;
        if (fileInput.target.files && fileInput.target.files.length) {

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
			const [file] = fileInput.target.files;
			reader.readAsDataURL(file);

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
						this.isLoading = false;
						this.addressList[0].image = imgBase64Path;
                    }
                };
			};
			// reader.readAsDataURL(fileInput.target.files[0]);
        }
	}

	uploadLogo() {
		this.contactService.updateSingleContactData(this.addressList[0]).subscribe((res : any) => {
			if(res.code == 200){
				this.notifyService.showSuccess("Image updated!!", "Owner's Information");
			}else{
				this.notifyService.showError("Error Occured!!", "Owner's Information");
			}
		});
	}
	onRemoveImg(){
		this.imageError = '' ;
		this.isImageSaved = false;
		this.cardImageBase64 = '' ;
	}

}
