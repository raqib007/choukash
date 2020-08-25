import { Component, OnInit } from '@angular/core';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { User } from '../../../_models';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AlertService,AuthService } from '../../../_services';
import { MustMatch } from '../../../_helpers/must-watch.validator';
import { CustomValidators } from 'src/app/_helpers';

@Component({
	selector: 'elastic-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
	animations: [...ROUTE_TRANSITION],
	host: { '[@routeTransition]': '' }
})

export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	submitted = false;
    loading = false;
    showErrorMsg = false;
	user: any = {};
	error_msg = "";

	constructor(
		private formBuilder: FormBuilder,
		private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
		private authService : AuthService,
        private alertService: AlertService
	) { 
		// this.registerForm = this.createSignupForm();
	}

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            userName: ['', Validators.required],
            primaryEmail: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
			passwordConfirm: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue]
        }, {
			validator: MustMatch('password', 'passwordConfirm')
        });
	}

	createSignupForm(): FormGroup {
		return this.fb.group(
			{
				firstName: ['', Validators.required],
				lastName: ['', Validators.required],
				userName: ['', Validators.required],
				primaryEmail: ['', [Validators.required, Validators.email]],
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
				passwordConfirm: [null, Validators.compose([Validators.required])],
				acceptTerms: [false, Validators.requiredTrue]
			},
			{
				validator: CustomValidators.passwordMatchValidator
			}
		);
	}
	get f() { return this.registerForm.controls; }

	register() {
		this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        /** reset alerts on submit **/
        this.alertService.clear();
		this.loading = true;
		this.authService.register(this.registerForm.value).subscribe((res)=>{
			console.log('in resgister = ',res);
			this.error_msg = res.message;
			if(res.status == true){
				this.alertService.success('Registration successful', { keepAfterRouteChange: true });
			}else{
				this.showErrorMsg = true;
				this.alertService.error(res.message);
				this.loading = false;
			}
		});
	}

}
