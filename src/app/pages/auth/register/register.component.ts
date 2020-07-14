import { Component, OnInit } from '@angular/core';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { User } from '../../../_models';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AlertService,AuthService } from '../../../_services';
import { MustMatch } from '../../../_helpers/must-watch.validator';

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
        private route: ActivatedRoute,
        private router: Router,
		private authService : AuthService,
        private alertService: AlertService
	) { }

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            user_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            passwordConfirm: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue]
        }, {
            validator: MustMatch('password', 'passwordConfirm')
        });
	}

	get f() { return this.registerForm.controls; }

	register() {
		this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
		// console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
		
        /** reset alerts on submit **/
        this.alertService.clear();
		this.loading = true;
		this.authService.register(this.registerForm.value).subscribe((res)=>{
			console.log('in resgister = ',res.code);
			console.log(res.code == 500);
			this.error_msg = res.message;
			if(res.code == 500){
				this.showErrorMsg = true;
				this.alertService.error(res.message);
				this.loading = false;
			}
			if(res.code == 200){
				this.alertService.success('Registration successful', { keepAfterRouteChange: true });
			}
		});
	}

}
