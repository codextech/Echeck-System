import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../_guards/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';





@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbCarouselModule
    ],
    declarations: [
        LandingPageComponent,
        AboutComponent,
        ContactComponent
    ],
    providers: [

      ]
})
export class HomeModule { }
