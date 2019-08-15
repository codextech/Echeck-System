import { Routes } from "@angular/router";
import { LandingPageComponent } from 'src/app/home/landing-page/landing-page.component';
import { AboutComponent } from 'src/app/home/about/about.component';
import { ContactComponent } from 'src/app/home/contact/contact.component';




export const LANDING_LAYOUTS_ROUTES: Routes = [

  { path: '', component: LandingPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },


];
