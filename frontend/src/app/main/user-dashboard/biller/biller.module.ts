import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { TableModule } from 'ngx-easy-table';
import { UserDashBoardComponent } from '../user-dashboard.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { GetBillerComponent } from './get-biller/get-biller.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxSmartModalModule.forChild(),
    TableModule
  ],
  declarations: [GetBillerComponent]
})
export class BillerModule { }
