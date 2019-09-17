import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Page404Component } from './page404/page404.component';
import { Page505Component } from './page505/page505.component';






@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
       Page404Component,
       Page505Component
    ],
    providers: [

      ],
})
export class ErrorModule { }
