import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddChequeComponent } from './add-cheque/add-cheque.component';
import { FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { UserDashBoardComponent } from '../user-dashboard.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { FlipModule } from 'ngx-flip';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NguCarouselModule } from '@ngu/carousel';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { SenderSignatoryComponent } from './signatory-checks/sender-signatory/sender-signatory.component';
import { RecieverSignatoryComponent } from './signatory-checks/reciever-signatory/reciever-signatory.component';
import { AddRecieverSignatureComponent } from './check-signatures/add-reciever-signature/add-reciever-signature.component';
import { AddSpSignatureComponent } from './check-signatures/add-sp-signature/add-sp-signature.component';
import { AddRpSignatureComponent } from './check-signatures/add-rp-signature/add-rp-signature.component';
import { AllSentChecksComponent } from './check-history/all-sent-checks/all-sent-checks.component';
import { AllRecievedChecksComponent } from './check-history/all-recieved-checks/all-recieved-checks.component';
import { RecievedChecksComponent } from './recieved-checks/recieved-checks.component';
import { RecievedCheckComponent } from './check-history/recieved-check/recieved-check.component';
import { SentCheckComponent } from './check-history/sent-check/sent-check.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DragDropModule,
        RouterModule,
        NgxSmartModalModule.forChild(),
        FlipModule,
        NgbModule,
        NgxPaginationModule,
        FilterPipeModule,
        NguCarouselModule,
        BsDatepickerModule,
        SharedModule
    ],
    declarations: [
            AddChequeComponent,
            RecievedChecksComponent,
            AddRecieverSignatureComponent,
            SenderSignatoryComponent,
            RecieverSignatoryComponent,
            AddSpSignatureComponent,
            AddRpSignatureComponent,
            AllSentChecksComponent,
            AllRecievedChecksComponent,
            SentCheckComponent,
            RecievedCheckComponent,

    ],

})
export class ChequedModule { }
