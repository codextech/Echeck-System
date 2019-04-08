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
import { DragScrollModule } from 'ngx-drag-scroll';
import { EditBankAccountComponent } from './edit-bank-account/edit-bank-account.component';

const routes: Routes = [];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NgxSmartModalModule.forChild(),
        TableModule, // for data table
        DragScrollModule
    ],
    declarations: [
        AddBankComponent,
        GetBanksComponent,
        GetBankAccountsComponent,
        AddBankAccountComponent,
        EditBankAccountComponent
    ],

})
export class BankModule { }
