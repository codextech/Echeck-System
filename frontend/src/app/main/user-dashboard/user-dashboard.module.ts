import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountModule } from './user-accounts/account.module';
import { BankModule } from './user-accounts/bank-account/bank.module';
import { UserDashBoardComponent } from './user-dashboard.component';
import { SharedUIModule } from '../shared-ui/shared-ui.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { CompanyModule } from './company/company.module';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { AddChequeComponent } from './cheques/add-cheque/add-cheque.component';
import { AccountSettingsComponent } from './user-accounts/account-settings/account-settings.component';
import { GetCompanyComponent } from './company/get-company/get-company.component';
import { GetBanksComponent } from './user-accounts/bank-account/get-banks/get-banks.component';
import { AddBankComponent } from './user-accounts/bank-account/add-bank/add-bank.component';
import { AddBankAccountComponent } from './user-accounts/bank-account/add-bank-account/add-bank-account.component';
import { GetBankAccountsComponent } from './user-accounts/bank-account/get-bank-accounts/get-bank-accounts.component';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, NgxUiLoaderConfig, SPINNER } from 'ngx-ui-loader';
import { ChequedModule } from './cheques/cheque.module';
import { MatNativeDateModule } from '@angular/material/core';
import { BillerModule } from './biller/biller.module';
import { GalleryModule } from './gallery/gallery.module';

const routes: Routes = [

  {path: '', component: UserDashBoardComponent, canActivate: [AuthGuard],
  children: [
    { path: 'dashboard', component: DashboardHomeComponent }

]},


];


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    fgsColor: '#3b92ba',
    fgsSize: 50,
    overlayColor: 'rgba(250,247,247,0.45)',
    fgsType: SPINNER.threeStrings,
  };

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AccountModule,
        BillerModule,
        CompanyModule,
        GalleryModule,
        ChequedModule,
        SharedUIModule,
        MatNativeDateModule,

        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)

    ],
    declarations: [
        UserDashBoardComponent,
        DashboardHomeComponent

    ],

})
export class UserDashBoardModule { }
