import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { UserDashBoardModule } from './user-dashboard/user-dashboard.module';
import { AuthGuard } from '../_guards/auth.guard';




const routes: Routes = [


];

@NgModule({
    imports: [
        CommonModule,
        UserDashBoardModule,
        RouterModule,

    ],
    declarations: [
        MainComponent
    ],
    providers: [

      ]
})
export class MainModule { }
