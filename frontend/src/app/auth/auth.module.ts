import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';

const routes: Routes = [];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule

    ],
    declarations: [
        LoginComponent,
        SignupComponent,
        ResetPasswordComponent,
        NewPasswordComponent,
        ChangePasswordComponent,
        EmailVerifyComponent
    ],

})
export class AuthdModule { }
