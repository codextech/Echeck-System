import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BanksLogoComponent } from './banks-logo/banks-logo.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { TableModule } from 'ngx-easy-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AdminDashBoardComponent } from './admin-dashboard.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgxGalleryModule } from 'ngx-gallery';

import { SharedModule } from 'src/app/shared/shared.module';

import { AccountTypeComponent } from './account-type/account-type.component';
import { KycRequestComponent } from './kyc/kyc-request/kyc-request.component';
import { KycRequestsComponent } from './kyc/kyc-requests/kyc-requests.component';
import { TotalUsersComponent } from './users/total-users/total-users.component';
import { UnverifiedUsersComponent } from './users/unverified-users/unverified-users.component';
import { KycTypeComponent } from './kyc/kyc-type/kyc-type.component';
import { SliderImageComponent } from './slider-image/slider-image.component';
import { CheckBackgroundComponent } from './check-background/check-background.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { ContactRequestComponent } from './contact-request/contact-request.component';
import { AdminCmsModule } from './admin-cms/admin-cms.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NgxSmartModalModule.forChild(),
        TableModule, // for data table
        NgbModule,
        NgxPaginationModule,
        FilterPipeModule,
        DropzoneModule,
        NgxGalleryModule,
        AdminCmsModule, // for CMS
        SharedModule
    ],
    declarations: [
        AdminDashBoardComponent,
        BanksLogoComponent,
        AccountTypeComponent,
        KycRequestComponent,
        KycRequestsComponent,
        KycTypeComponent,
        TotalUsersComponent,
        UnverifiedUsersComponent,
        SliderImageComponent,
        CheckBackgroundComponent,
        SubscriberComponent,
        ContactRequestComponent

    ],

})
export class AdminDashBoardModule { }
