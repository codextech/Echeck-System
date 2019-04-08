import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule

    ],
    declarations: [
        LoginComponent,
        SignupComponent

    ],

})
export class AuthdModule { }
