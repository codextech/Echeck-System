import { CheckSummaryComponent } from 'src/app/main/user-dashboard/cheques/check-summary/check-summary.component';
import { Routes } from '@angular/router';
import { UserDashBoardComponent } from 'src/app/main/user-dashboard/user-dashboard.component';
import { DashboardHomeComponent } from 'src/app/main/user-dashboard/dashboard-home/dashboard-home.component';
import { GetBillerComponent } from 'src/app/main/user-dashboard/biller/get-biller/get-biller.component';
import { SenderSignatoryComponent } from 'src/app/main/user-dashboard/cheques/signatory-checks/sender-signatory/sender-signatory.component';
import { AddChequeComponent } from 'src/app/main/user-dashboard/cheques/add-cheque/add-cheque.component';
import { RecievedChecksComponent } from 'src/app/main/user-dashboard/cheques/recieved-checks/recieved-checks.component';
// tslint:disable-next-line:max-line-length
import { AddRecieverSignatureComponent } from 'src/app/main/user-dashboard/cheques/check-signatures/add-reciever-signature/add-reciever-signature.component';
import { AddSpSignatureComponent } from 'src/app/main/user-dashboard/cheques/check-signatures/add-sp-signature/add-sp-signature.component';
// tslint:disable-next-line:max-line-length
import { RecieverSignatoryComponent } from 'src/app/main/user-dashboard/cheques/signatory-checks/reciever-signatory/reciever-signatory.component';
import { AddRpSignatureComponent } from 'src/app/main/user-dashboard/cheques/check-signatures/add-rp-signature/add-rp-signature.component';
import { AllSentChecksComponent } from 'src/app/main/user-dashboard/cheques/check-history/all-sent-checks/all-sent-checks.component';
// tslint:disable-next-line:max-line-length
import { AllRecievedChecksComponent } from 'src/app/main/user-dashboard/cheques/check-history/all-recieved-checks/all-recieved-checks.component';
import { SentCheckComponent } from 'src/app/main/user-dashboard/cheques/check-history/sent-check/sent-check.component';
import { RecievedCheckComponent } from 'src/app/main/user-dashboard/cheques/check-history/recieved-check/recieved-check.component';
import { GetCompanyComponent } from 'src/app/main/user-dashboard/company/get-company/get-company.component';
import { UserDocumentsComponent } from 'src/app/main/user-dashboard/gallery/user-documents/user-documents.component';
import { AccountSettingsComponent } from 'src/app/main/user-dashboard/user-accounts/account-settings/account-settings.component';
import { GetBanksComponent } from 'src/app/main/user-dashboard/user-accounts/bank-account/get-banks/get-banks.component';
import { AddBankComponent } from 'src/app/main/user-dashboard/user-accounts/bank-account/add-bank/add-bank.component';
import { AddBankAccountComponent } from 'src/app/main/user-dashboard/user-accounts/bank-account/add-bank-account/add-bank-account.component';
import { GetBankAccountsComponent } from 'src/app/main/user-dashboard/user-accounts/bank-account/get-bank-accounts/get-bank-accounts.component';
import { EditBankAccountComponent } from 'src/app/main/user-dashboard/user-accounts/bank-account/edit-bank-account/edit-bank-account.component';
import { AddSignatureComponent } from 'src/app/main/user-dashboard/user-accounts/bank-account/add-signature/add-signature.component';
import { AdminDashBoardComponent } from 'src/app/main/admin-dashboard/admin-dashboard.component';
import { BanksLogoComponent } from 'src/app/main/admin-dashboard/banks-logo/banks-logo.component';
import { AccountTypeComponent } from 'src/app/main/admin-dashboard/account-type/account-type.component';
import { TotalUsersComponent } from 'src/app/main/admin-dashboard/users/total-users/total-users.component';
import { UnverifiedUsersComponent } from 'src/app/main/admin-dashboard/users/unverified-users/unverified-users.component';
import { KycRequestsComponent } from 'src/app/main/admin-dashboard/kyc/kyc-requests/kyc-requests.component';
import { KycRequestComponent } from 'src/app/main/admin-dashboard/kyc/kyc-request/kyc-request.component';
import { KycTypeComponent } from 'src/app/main/admin-dashboard/kyc/kyc-type/kyc-type.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { AuthorizationGuard } from 'src/app/_guards/authorization.guard';
import { SliderImageComponent } from 'src/app/main/admin-dashboard/slider-image/slider-image.component';
import { CheckBackgroundComponent } from 'src/app/main/admin-dashboard/check-background/check-background.component';
import { ContactRequestComponent } from 'src/app/main/admin-dashboard/contact-request/contact-request.component';
import { SubscriberComponent } from 'src/app/main/admin-dashboard/subscriber/subscriber.component';
import { ContactPageComponent } from 'src/app/main/admin-dashboard/admin-cms/contact-page/contact-page.component';
import { AboutPageComponent } from 'src/app/main/admin-dashboard/admin-cms/about-page/about-page.component';
import { FaqPageComponent } from 'src/app/main/admin-dashboard/admin-cms/faq-page/faq-page.component';
import { HomePageComponent } from 'src/app/main/admin-dashboard/admin-cms/home-page/home-page.component';
import { MakeCheckPageComponent } from 'src/app/main/admin-dashboard/admin-cms/make-check-page/make-check-page.component';
import { FooterPageComponent } from 'src/app/main/admin-dashboard/admin-cms/footer-page/footer-page.component';
import { PolicyPageComponent } from 'src/app/main/admin-dashboard/admin-cms/policy-page/policy-page.component';
import { TermPageComponent } from 'src/app/main/admin-dashboard/admin-cms/term-page/term-page.component';
import { IconPageComponent } from 'src/app/main/admin-dashboard/admin-cms/icon-page/icon-page.component';

export const ADMIN_LAYOUTS_ROUTES: Routes = [

  { path: 'dashboard', component: UserDashBoardComponent },
  { path: 'get-billers', component: GetBillerComponent },
  { path: 'get-companies', component: GetCompanyComponent },
  { path: 'documents', component: UserDocumentsComponent },



  // ----------Check Routes-----------

  { path: 'make-payment/check', component: AddChequeComponent },

  // Check Recieved
  { path: 'recieved-checks', component: RecievedChecksComponent },
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
  { path: 'check-history/sent/:checkId', component: SentCheckComponent },
  { path: 'check-history/receieved/:checkId', component: RecievedCheckComponent },
  { path: 'check-history/summary', component: CheckSummaryComponent },




  // -------------------user Account Routes -----------------

  { path: 'settings', component: AccountSettingsComponent },
  { path: 'banks', component: GetBanksComponent },
  { path: 'add-bank', component: AddBankComponent },
  { path: 'add/bank-account', component: AddBankAccountComponent },
  { path: 'get/bank-accounts', component: GetBankAccountsComponent },
  { path: 'edit/bank-account/:id', component: EditBankAccountComponent },
  { path: 'add/signature', component: AddSignatureComponent },



  // -------------------Admin Dashboard Routes -----------------


  {
    path: 'admin',
    canActivate: [AuthGuard],
    canActivateChild: [AuthorizationGuard],
  children: [
      {
          path: 'dashboard',
          component: AdminDashBoardComponent
      },
      {
        path: 'bank-logo',
        component: BanksLogoComponent
    },

    {
      path: 'account-type',
      component: AccountTypeComponent
  },
  {
    path: 'total-users',
    component: TotalUsersComponent
},
{
  path: 'unverified-users',
  component: UnverifiedUsersComponent
},

{
  path: 'kyc-requests',
  component: KycRequestsComponent
},

{
  path: 'kyc-request/:id',
  component: KycRequestComponent
},


{
  path: 'kyc-type',
  component: KycTypeComponent
},

{
  path: 'slider',
  component: SliderImageComponent
},

{
  path: 'check-background',
  component: CheckBackgroundComponent
},

{
  path: 'requests',
  component: ContactRequestComponent
},

{
  path: 'subscribers',
  component: SubscriberComponent
},


/* -------------- CMS Routes ------------------ */

{
  path: 'cms',
children: [
{
  path: 'home',
  component: HomePageComponent
},

{
  path: 'about',
  component: AboutPageComponent
},

{
  path: 'contact',
  component: ContactPageComponent
},

{
  path: 'payment',
  component: MakeCheckPageComponent
},

{
  path: 'faq',
  component: FaqPageComponent
},

{
  path: 'footer',
  component: FooterPageComponent
},

{
  path: 'policy',
  component: PolicyPageComponent
},

{
  path: 'term',
  component: TermPageComponent
},

{
  path: 'icons',
  component: IconPageComponent
},
]
}


    ]
  }

];
