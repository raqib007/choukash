import { Component, OnInit } from '@angular/core';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService,AuthService } from '../../../_services';
import { CustomValidators } from '../../../_helpers/custome-validator';

@Component({
	selector: 'app-password-reset',
	templateUrl: './password-reset.component.html',
	styleUrls: ['./password-reset.component.scss'],
	animations: [...ROUTE_TRANSITION],
	host: { '[@routeTransition]': '' }
})
export class PasswordResetComponent implements OnInit {
	frmSignup: FormGroup;
	submitted = false;
    loading = false;
    showErrorMsg = false;
	user: any = {};
	error_msg = "";
	token = "";
	constructor(
		private actRoute: ActivatedRoute,
        private router: Router,
		private fb: FormBuilder,
		private authService : AuthService,
        private alertService: AlertService
	) { 
		this.frmSignup = this.createSignupForm();
	}

	ngOnInit() {
		this.actRoute.queryParamMap.subscribe(queryParams => {
			this.token = queryParams.get("token")
		});
	}
	createSignupForm(): FormGroup {
		return this.fb.group(
			{
				password: [
					null,
					Validators.compose([
						Validators.required,
						// check whether the entered password has a number
						CustomValidators.patternValidator(/\d/, {
							hasNumber: true
						}),
						// check whether the entered password has upper case letter
						CustomValidators.patternValidator(/[A-Z]/, {
							hasCapitalCase: true
						}),
						// check whether the entered password has a lower case letter
						CustomValidators.patternValidator(/[a-z]/, {
							hasSmallCase: true
						}),
						// check whether the entered password has a special character
						CustomValidators.patternValidator(
							/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
							{
								hasSpecialCharacters: true
							}
						),
						Validators.minLength(8)
					])
				],
				confirmPassword: [null, Validators.compose([Validators.required])]
			},
			{
				validator: CustomValidators.passwordMatchValidator
			}
		);
	}
	changePass() {
		let passData = {
			"confirmPassword": this.frmSignup.value.confirmPassword,
			"password": this.frmSignup.value.password,
			"token": this.token
		};
		this.authService.passwordChanged(passData).subscribe((res)=>{
			this.error_msg = res.message;
			if(res.httpStatusCode == 500){
				this.showErrorMsg = true;
				this.alertService.error(res.operationResult);
				this.loading = false;
			}
			if(res.httpStatusCode == 200){
				this.alertService.success('Password change successful', { keepAfterRouteChange: true });
				this.router.navigate(['/login']);
			}
		});
	}

}