import { Component, OnInit } from '@angular/core';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService,AuthService } from '../../../_services';

@Component({
	selector: 'app-email-verification',
	templateUrl: './email-verification.component.html',
	styleUrls: ['./email-verification.component.scss'],
	animations: [...ROUTE_TRANSITION],
	host: { '[@routeTransition]': '' }
})
export class EmailVerificationComponent implements OnInit {
	token: string;
	showSuccessMsg : boolean = false;
	showDiv : boolean = false;
	errMsg = "Something went wrong !";
	constructor(
        private actRoute: ActivatedRoute,
        private router: Router,
		private authService : AuthService,
        private alertService: AlertService
	) { 

	}
	ngOnInit() {
		this.actRoute.queryParamMap.subscribe(queryParams => {
			this.token = queryParams.get("token");
			this.authService.verifyEmail(this.token).subscribe((res)=>{
				this.errMsg = res.message;
				if(res.status){
					this.showSuccessMsg = true;
				}
				this.showDiv = true;
			});
		});
	}
	gotoLogin() {
		this.router.navigate(['/login']);
	}
}
