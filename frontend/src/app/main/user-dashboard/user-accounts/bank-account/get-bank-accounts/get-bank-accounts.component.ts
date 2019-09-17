import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/_services/config-datatable';
import { UserAccountService } from 'src/app/_services/user-account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-bank-accounts',
  templateUrl: './get-bank-accounts.component.html',
  styleUrls: ['./get-bank-accounts.component.css']
})
export class GetBankAccountsComponent implements OnInit {

  configuration = ConfigService.config;
  columns = [

    {
      key: 'bank',
      title: 'Bank'
    },
    {
      key: 'accountNumber',
      title: 'Account Number'
    },
    {
      key: 'accountName',
      title: 'Account Holder Name',
    },
    {
      key: 'accountType',
      title: 'Account Type',
    },
    {
      key: 'subAccount',
      title: 'Sub Account'
    },
    {
      key: 'actions', title: ''
    }
  ];

  accounts: any[] = [];
  constructor(private accountService: UserAccountService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getBankAccounts();
  }


getBankAccounts() {
 this.accountService.getBankAccounts().subscribe(result => {
   this.accounts = result.data;
console.log(this.accounts);

 }, err => {

 });
  }



/* @Param bankAccountId */
onDeleteAccount(id) {
  this.accountService.deleteBankAccount(id).subscribe(result => {
    this.accounts =  this.accounts.filter(item => item.bankAccountId !== id);
    this.toastr.success('Deleted SuccesFully');

  }, err => {

  });
}




}
