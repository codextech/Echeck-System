import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BankModule } from './bank-account/bank.module';
import { ChequedModule } from '../cheques/cheque.module';
import { AccountSettingsModule } from './account-settings/account-settings.module';
import { UserDashBoardComponent } from '../user-dashboard.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { GetBanksComponent } from './bank-account/get-banks/get-banks.component';
import { AddBankComponent } from './bank-account/add-bank/add-bank.component';
import { AddBankAccountComponent } from './bank-account/add-bank-account/add-bank-account.component';
import { GetBankAccountsComponent } from './bank-account/get-bank-accounts/get-bank-accounts.component';
import { EditBankAccountComponent } from './bank-account/edit-bank-account/edit-bank-account.component';
import { AddSignatureComponent } from './bank-account/add-signature/add-signature.component';


const routes: Routes = [


    {path: '', component: UserDashBoardComponent, canActivate: [AuthGuard],
  children: [




]},



];

@NgModule({
    imports: [
        CommonModule,
        BankModule,
        ChequedModule,
        AccountSettingsModule,
        RouterModule,
    ],
    declarations: [
    ],

})
export class AccountModule { }
