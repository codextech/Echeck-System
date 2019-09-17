import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../_guards/auth.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { TermsComponent } from './terms/terms.component';
import { PolicyComponent } from './policy/policy.component';
import { FaqsComponent } from './faqs/faqs.component';
import { SaveUrlPipe } from '../_pipe/saveUrl.pipe';





@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbCarouselModule,
        FormsModule
    ],
    declarations: [
        LandingPageComponent,
        AboutComponent,
        ContactComponent,
        PolicyComponent,
        TermsComponent,
        FaqsComponent,
        SaveUrlPipe
    ],
    providers: [

      ],
      exports: [SaveUrlPipe]
})
export class HomeModule { }
