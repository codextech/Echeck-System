import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings.component';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';



const routes: Routes = [

//         {path: 'settings', component: AccountSettingsComponent, canActivate: [AuthGuard],
//   children: [
//     { path: 'profile', component: UserProfileComponent },

//   ]}

];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NgbModule,
        DropzoneModule

    ],
    declarations: [
        AccountSettingsComponent

    ],

})
export class AccountSettingsModule { }
