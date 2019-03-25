import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { UserDashboardComponent } from './main/dashboard/user-dashboard/user-dashboard.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [

  {path: 'login', component: LoginComponent},

  {path: '', component: MainComponent,
    children: [
      { path: '', component: UserDashboardComponent },
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
