import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../_guards/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbCarouselModule
    ],
    declarations: [
        LandingPageComponent,

    ],
    providers: [

      ]
})
export class HomeModule { }
