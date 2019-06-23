import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxUiLoaderConfig, SPINNER, NgxUiLoaderModule } from 'ngx-ui-loader';
import { AdminLayoutComponent } from './admin-layout.component';
import { SharedUIModule } from 'src/app/main/shared-ui/shared-ui.module';
import { NoLayoutComponent } from './no-layout/no-layout.component';




@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedUIModule
    ],
    declarations: [
      AdminLayoutComponent,
      NoLayoutComponent
    ],

})
export class AdminLayoutModule { }
