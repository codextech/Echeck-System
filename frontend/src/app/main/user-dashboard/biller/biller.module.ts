import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { TableModule } from 'ngx-easy-table';
import { UserDashBoardComponent } from '../user-dashboard.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { GetBillerComponent } from './get-biller/get-biller.component';


const routes: Routes = [

  {path: '', component: UserDashBoardComponent, canActivate: [AuthGuard],
  children: [
    { path: 'get-billers', component: GetBillerComponent },
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
  declarations: [GetBillerComponent]
})
export class BillerModule { }
