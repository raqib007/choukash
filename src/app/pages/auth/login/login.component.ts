import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { NgForm } from '@angular/forms';
import { AuthService,AlertService } from '../../../_services';
import { first } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
	selector: 'elastic-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	animations: [...ROUTE_TRANSITION],
	host: { '[@routeTransition]': '' }
})
export class LoginComponent implements OnInit {

	username: string;
	password: string;
	loading = false;
	returnUrl: string;
	showErr = false;
	errorMsg = "";

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private authService : AuthService,
		private alertService : AlertService
	) { }

	ngOnInit() {
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	login(form : NgForm) {
		this.alertService.clear();
		this.loading = true;
		this.showErr = false;
		this.errorMsg = "";
		
        this.authService.login(form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
					this.showErr = true;
					this.errorMsg = "Email or password incorrect";
                    this.alertService.error(error);
                    this.loading = false;
				});
				
		// this.authService.login(form.value).subscribe((res)=>{
		// 	console.log('login = ',res);
		// 	form.reset();
		// 	this.router.navigate(['/']);
		// });
	}

}
