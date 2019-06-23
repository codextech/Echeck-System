import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { UserDashBoardModule } from './user-dashboard/user-dashboard.module';
import { AuthGuard } from '../_guards/auth.guard';
import { AccountModule } from './user-dashboard/user-accounts/account.module';
import { SPINNER, NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';
import { BillerModule } from './user-dashboard/biller/biller.module';
import { CompanyModule } from './user-dashboard/company/company.module';
import { GalleryModule } from './user-dashboard/gallery/gallery.module';
import { ChequedModule } from './user-dashboard/cheques/cheque.module';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminDashBoardModule } from './admin-dashboard/admin-dashboard..module';






@NgModule({
  imports: [
      CommonModule,
      RouterModule,
      UserDashBoardModule,
      AdminDashBoardModule

  ],
    declarations: [
        MainComponent,

    ],
    providers: [

      ]
})
export class MainModule { }
