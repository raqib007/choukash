import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_TRANSITION } from '../../../app.animation';
import { AuthService } from '../../../_services';
import { AuthModule } from '../auth.module';

@Component({
    selector: 'elastic-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    animations: [...ROUTE_TRANSITION],
    host: { '[@routeTransition]': '' }
})
export class ForgotPasswordComponent implements OnInit {

    email: string;

    constructor(
	  private router: Router,
	  private authService : AuthService
    ) { }

    ngOnInit() {
    }

    send() {
        this.authService.passwordReset(this.email).subscribe((res)=>{
			console.log('in resgister = ',res.code);
		});
        // this.router.navigate(['/']);
    }

}
