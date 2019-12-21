import { Routes } from "@angular/router";
import { LandingPageComponent } from 'src/app/home/landing-page/landing-page.component';
import { AboutComponent } from 'src/app/home/about/about.component';
import { ContactComponent } from 'src/app/home/contact/contact.component';
import { PolicyComponent } from 'src/app/home/policy/policy.component';
import { FaqsComponent } from 'src/app/home/faqs/faqs.component';
import { TermsComponent } from 'src/app/home/terms/terms.component';




export const LANDING_LAYOUTS_ROUTES: Routes = [

  { path: '',
   component: LandingPageComponent,
   },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqsComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'terms', component: TermsComponent },


];
