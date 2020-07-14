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
	constructor(
        private actRoute: ActivatedRoute,
        private router: Router,
		private authService : AuthService,
        private alertService: AlertService
	) { 

	}
	ngOnInit() {
		this.actRoute.queryParamMap.subscribe(queryParams => {
			console.log(queryParams);
			this.token = queryParams.get("token")
		});
	}
	gotoLogin() {
		this.authService.verifyEmail(this.token).subscribe((res)=>{
			this.router.navigate(['/login']);
		});
	}

}
