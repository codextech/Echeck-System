import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddChequeComponent } from './add-cheque/add-cheque.component';
import { FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { UserDashBoardComponent } from '../user-dashboard.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { DragScrollModule } from 'ngx-drag-scroll';
import { FlipModule } from 'ngx-flip';
import { RecievedCheckComponent } from './recieved-check/recieved-check.component';
import { SenderSignatoryComponent } from './signatory-checks/sender-signatory/sender-signatory.component';
import { RecieverSignatoryComponent } from './signatory-checks/reciever-signatory/reciever-signatory.component';
import { AddRecieverSignatureComponent } from './check-signatures/add-reciever-signature/add-reciever-signature.component';
import { AddSpSignatureComponent } from './check-signatures/add-sp-signature/add-sp-signature.component';
import { AddRpSignatureComponent } from './check-signatures/add-rp-signature/add-rp-signature.component';
import { AllSentChecksComponent } from './check-history/all-sent-checks/all-sent-checks.component';
import { AllRecievedChecksComponent } from './check-history/all-recieved-checks/all-recieved-checks.component';
const routes: Routes = [

    {path: '', component: UserDashBoardComponent, canActivate: [AuthGuard],
    children: [
      { path: 'generate-cheque', component: AddChequeComponent },

      // Check Recieved
      { path: 'recieved-checks', component: RecievedCheckComponent },
      { path: 'reciever-signature/:checkId', component: AddRecieverSignatureComponent },

      // Sender Partner Signatures
      { path: 'sender/signature-requests', component: SenderSignatoryComponent },
      { path: 'sender/signature-request/:checkId', component: AddSpSignatureComponent },

       // Reciever Partner Signatures
       { path: 'reciever/signature-requests', component: RecieverSignatoryComponent },
      { path: 'reciever/signature-request/:checkId', component: AddRpSignatureComponent },

      // check history
      { path: 'check-history/sent', component: AllSentChecksComponent },
      { path: 'check-history/receieved', component: AllRecievedChecksComponent },

  ]},


  ];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DragDropModule,
        RouterModule.forChild(routes),
        NgxSmartModalModule.forChild(),
        DragScrollModule,
        FlipModule


    ],
    declarations: [
            AddChequeComponent,
            RecievedCheckComponent,
            AddRecieverSignatureComponent,
            SenderSignatoryComponent,
            RecieverSignatoryComponent,
            AddSpSignatureComponent,
            AddRpSignatureComponent,
            AllSentChecksComponent,
            AllRecievedChecksComponent,

    ],

})
export class ChequedModule { }
