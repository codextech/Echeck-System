import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { NewPasswordComponent } from './auth/new-password/new-password.component';
import { EmailVerifyComponent } from './auth/email-verify/email-verify.component';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'reset-request', component: ResetPasswordComponent},
  {path: 'reset-password/:token', component: NewPasswordComponent},
  {path: 'email-Verification', component: EmailVerifyComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
