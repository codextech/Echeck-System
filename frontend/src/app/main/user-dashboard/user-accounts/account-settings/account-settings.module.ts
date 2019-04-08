import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings.component';
import { FormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';
import { DropzoneModule } from 'ngx-dropzone-wrapper';



const routes: Routes = [];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        DropzoneModule

    ],
    declarations: [
        AccountSettingsComponent,
        FileSelectDirective

    ],

})
export class AccountSettingsModule { }
