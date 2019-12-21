import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings.component';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NgbModule,
        DropzoneModule,
        NgxIntlTelInputModule
    ],
    declarations: [
        AccountSettingsComponent

    ],

})
export class AccountSettingsModule { }
