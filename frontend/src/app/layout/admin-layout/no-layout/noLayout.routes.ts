import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { ResetPasswordComponent } from 'src/app/auth/reset-password/reset-password.component';
import { NewPasswordComponent } from 'src/app/auth/new-password/new-password.component';
import { EmailVerifyComponent } from 'src/app/auth/email-verify/email-verify.component';
import { LandingPageComponent } from 'src/app/home/landing-page/landing-page.component';

export const NO_LAYOUTS_ROUTES: Routes = [


  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'reset-request', component: ResetPasswordComponent},
  {path: 'reset-password/:token', component: NewPasswordComponent},
  {path: 'email-Verification', component: EmailVerifyComponent},
  {path: '', component: LandingPageComponent},
];
