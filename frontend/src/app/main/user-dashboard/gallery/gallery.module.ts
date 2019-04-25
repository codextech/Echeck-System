import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { UserDashBoardComponent } from '../user-dashboard.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { UserDocumentsComponent } from './user-documents/user-documents.component';


const routes: Routes = [

  {path: '', component: UserDashBoardComponent, canActivate: [AuthGuard],
  children: [
    { path: 'documents', component: UserDocumentsComponent },
]},

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxSmartModalModule.forChild(),
  ],
  declarations: [
    UserDocumentsComponent
  ]
})
export class GalleryModule { }
