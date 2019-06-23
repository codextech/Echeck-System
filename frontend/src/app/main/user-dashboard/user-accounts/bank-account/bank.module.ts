import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddBankComponent } from './add-bank/add-bank.component';
import { GetBankAccountsComponent } from './get-bank-accounts/get-bank-accounts.component';
import { FormsModule } from '@angular/forms';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AddBankAccountComponent } from './add-bank-account/add-bank-account.component';
import { GetBanksComponent } from './get-banks/get-banks.component';
import { TableModule } from 'ngx-easy-table';
import { EditBankAccountComponent } from './edit-bank-account/edit-bank-account.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddSignatureComponent } from './add-signature/add-signature.component';
import { NguCarouselModule } from '@ngu/carousel';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NgxSmartModalModule.forChild(),
        TableModule, // for data table
        NgbModule,
        NguCarouselModule,
        DropzoneModule,
        NgxIntlTelInputModule,


    ],
    declarations: [
        AddBankComponent,
        GetBanksComponent,
        GetBankAccountsComponent,
        AddBankAccountComponent,
        EditBankAccountComponent,
        AddSignatureComponent
    ],

})
export class BankModule { }
