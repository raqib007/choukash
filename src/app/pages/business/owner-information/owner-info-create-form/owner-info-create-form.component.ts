import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from 'src/app/_services';
import { Contact } from 'src/app/model';

@Component({
	selector: 'app-owner-info-create-form',
	templateUrl: './owner-info-create-form.component.html',
	styleUrls: ['./owner-info-create-form.component.scss']
})
export class OwnerInfoCreateFormComponent implements OnInit {
	@Input() dropdownList: any;
	selectedIndex = 0;
	defaultAddress = new Contact();
	invoiceAddress = new Contact();
	shippingAddress = new Contact();

	addressList = [];
	showErrMsg = false;
	errMsg = '';
	allData : any;

    constructor(
		private contactService : ContactService,
		private dialogRef: MatDialogRef<OwnerInfoCreateFormComponent>,
		@Inject(MAT_DIALOG_DATA) pass_data:any,
	) {
		this.defaultAddress.address_type = "Default";
		this.invoiceAddress.address_type = "Invoice";
		this.shippingAddress.address_type = "Shipping";
		this.defaultAddress.is_owner = true;
		this.invoiceAddress.is_owner = true;
		this.shippingAddress.is_owner = true;
		this.addressList = [this.defaultAddress,this.invoiceAddress,this.shippingAddress];
		pass_data.addressList = this.addressList;
		this.allData = pass_data;
	 }

    ngOnInit(): void {
		console.log('in modal parent page = ',this.allData);
	}
	saveAddress(){
        this.contactService.saveContactData(this.addressList).subscribe((res : any) => {
			if(res.code == 200){
				this.dialogRef.close(this.addressList);
			}else{
				this.showErrMsg = true;
				this.errMsg = res.message;
			}
		});
	}

}
