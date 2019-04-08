import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetCompanyComponent } from './get-company/get-company.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { TableModule } from 'ngx-easy-table';
import { UserDashBoardComponent } from '../user-dashboard.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';


const routes: Routes = [

  {path: '', component: UserDashBoardComponent, canActivate: [AuthGuard],
  children: [
    { path: 'get-companies', component: GetCompanyComponent },
]},

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxSmartModalModule.forChild(),
    TableModule
  ],
  declarations: [GetCompanyComponent]
})
export class CompanyModule { }
