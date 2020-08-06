import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/model';

@Component({
	selector: 'edit-business-default-address',
	templateUrl: './edit-default-address.component.html',
	styleUrls: ['./edit-default-address.component.scss']
})
export class EditDefaultAddressComponent implements OnInit {
	@Input() dropdownList: any;
	formData : Contact;
	constructor() { }

	ngOnInit(): void {
		if(this.dropdownList.type == 1 || this.dropdownList.type == 0){
			this.formData = this.dropdownList.addressList[0];
		}else if(this.dropdownList.type == 2){
			this.formData = this.dropdownList.addressList[1];
		}else{
			this.formData = this.dropdownList.addressList[2];
		}
	}

}
