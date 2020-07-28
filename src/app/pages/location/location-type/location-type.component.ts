import { Component, OnInit } from '@angular/core';
import { LocationService, NotificationService } from 'src/app/_services';
import { SortablejsOptions } from 'ngx-sortablejs';

@Component({
	selector: 'erp-location-type',
	templateUrl: './location-type.component.html',
	styleUrls: ['./location-type.component.scss']
})
export class LocationTypeComponent implements OnInit {

	alllocationList = [];
	activelocationList = [];
	groupOptions: SortablejsOptions = {
		group: 'testGroup',
		handle: '.drag-handle',
		animation: 300
	};

	constructor(
		private locationService: LocationService,
		private notifyService: NotificationService,
	) { }

	ngOnInit(): void {
		this.getLocationType();
	}
	getLocationType(){
        this.locationService.getAllLocationType()
		.subscribe(
			res => {
				this.alllocationList = res.filter((item : any) => !item.is_active);
				this.activelocationList = res.filter((item : any) => item.is_active == true);
			},
			err => {
				this.notifyService.showError(err, "Location Type");
			},
			() => {
			}
		);
	}
	save_location_type(){
		this.alllocationList.forEach(element => {
			element.is_active = false;
		});
		this.activelocationList.forEach(element => {
			element.is_active = true;
		});
		const allLocation = [...this.alllocationList, ...this.activelocationList];
		this.locationService.saveAllLocationType(allLocation).subscribe((res : any) => {
			if(res.code == 200){
				this.notifyService.showSuccess('Contact type successfully assigned!', "Conatact Type");
			}else{
				this.notifyService.showError('Data save was unsuccessful!', "Conatact Type");
			}
		});
	}

}
