import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { EmailVerificationModule } from './email-verification/email-verification.module';
import { PasswordRestModule } from './password-reset/password-reset.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		LoginModule,
		RegisterModule,
		ForgotPasswordModule,
		EmailVerificationModule,
		PasswordRestModule
	],
	declarations: []
})
export class AuthModule { }
