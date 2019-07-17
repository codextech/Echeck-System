import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { UserDashBoardModule } from './user-dashboard/user-dashboard.module';
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
