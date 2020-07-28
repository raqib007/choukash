import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'ngx-sortablejs';
import { LocationService, NotificationService, ContactService } from 'src/app/_services';

@Component({
	selector: 'erp-contact-type',
	templateUrl: './contact-type.component.html',
	styleUrls: ['./contact-type.component.scss']
})
export class ContactTypeComponent implements OnInit {

	allContactList = [];
	activeContactList = [];
	groupOptions: SortablejsOptions = {
		group: 'testGroup',
		handle: '.drag-handle',
		animation: 300
	};

	constructor(
		private contactService: ContactService,
		private notifyService: NotificationService,
	) { }

	ngOnInit(): void {
		this.getLocationType();
	}
	getLocationType(){
        this.contactService.getAllContactType()
		.subscribe(
			res => {
				this.allContactList = res.filter((item : any) => !item.is_active);
				this.activeContactList = res.filter((item : any) => item.is_active == true);
			},
			err => {
				this.notifyService.showError(err, "Contact Type");
			},
			() => {
			}
		);
	}
	save_location_type(){
		this.allContactList.forEach(element => {
			element.is_active = false;
		});
		this.activeContactList.forEach(element => {
			element.is_active = true;
		});
		const allContact = [...this.allContactList, ...this.activeContactList];
		this.contactService.saveAllContactType(allContact).subscribe((res : any) => {
			if(res.code == 200){
				this.notifyService.showSuccess('Contact type successfully assigned!', "Conatact Type");
			}else{
				this.notifyService.showError('Data save was unsuccessful!', "Conatact Type");
			}
		});
	}

}
