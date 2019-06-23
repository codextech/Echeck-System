import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthGuard } from './_guards/auth.guard';
import { ADMIN_LAYOUTS_ROUTES } from './layout/admin-layout/adminLayout.routes';
import { LANDING_LAYOUTS_ROUTES } from './layout/landing-layout/landingLayout.routes';
import { LandingLayoutComponent } from './layout/landing-layout/landing-layout.component';
import { NoLayoutComponent } from './layout/admin-layout/no-layout/no-layout.component';
import { NO_LAYOUTS_ROUTES } from './layout/admin-layout/no-layout/noLayout.routes';

const routes: Routes = [

  {path: '', component: LandingLayoutComponent,
  children: LANDING_LAYOUTS_ROUTES
  },

 {path: '', component: AdminLayoutComponent, canActivate: [AuthGuard],
  children: ADMIN_LAYOUTS_ROUTES
 },

 {path: '', component: NoLayoutComponent,
 children: NO_LAYOUTS_ROUTES
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
