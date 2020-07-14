import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

export const authRoutes: Routes = [
    { path: 'login',component: LoginComponent},
    { path: 'register',component: RegisterComponent},
    { path: 'forgot-password',component: ForgotPasswordComponent},
    { path: 'verify-email',component: EmailVerificationComponent},
    { path: 'password-reset',component: PasswordResetComponent}
];
