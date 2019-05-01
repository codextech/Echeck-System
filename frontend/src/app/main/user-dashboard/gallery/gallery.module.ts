import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { DropzoneModule} from 'ngx-dropzone-wrapper';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { UserDashBoardComponent } from '../user-dashboard.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { UserDocumentsComponent } from './user-documents/user-documents.component';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [

  {path: '', component: UserDashBoardComponent, canActivate: [AuthGuard],
  children: [
    { path: 'documents', component: UserDocumentsComponent },
]},

];

@NgModule({
  imports: [
    CommonModule,
    DropzoneModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxSmartModalModule.forChild(),
    NgxPaginationModule,
    FilterPipeModule,
    SharedModule
  ],
  declarations: [
    UserDocumentsComponent,

  ]
})
export class GalleryModule { }
