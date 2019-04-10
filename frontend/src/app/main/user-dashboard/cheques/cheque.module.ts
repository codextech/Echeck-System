import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddChequeComponent } from './add-cheque/add-cheque.component';
import { FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { UserDashBoardComponent } from '../user-dashboard.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
const routes: Routes = [

    {path: '', component: UserDashBoardComponent, canActivate: [AuthGuard],
    children: [
      { path: 'generate-cheque', component: AddChequeComponent },
  ]},

  ];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DragDropModule,
        RouterModule.forChild(routes)

    ],
    declarations: [
            AddChequeComponent

    ],

})
export class ChequedModule { }
