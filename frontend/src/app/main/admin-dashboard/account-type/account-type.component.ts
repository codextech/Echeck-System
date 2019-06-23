import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/_services/config-datatable';
import { UserAccountService } from 'src/app/_services/user-account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.css']
})
export class AccountTypeComponent implements OnInit {

  bankAccountTypes: any[] = [];
  accountModel: any = {};
  configuration = ConfigService.config;
  columns = [
    {
      key: 'accountType',
      title: 'Account Type',
    },

    {
      key: 'actions', title: 'Actions'
    }
  ];

  constructor(private accountService: UserAccountService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getAccountTypes();
}

getAccountTypes() {
this.accountService.getBankAccountTypes().subscribe(
  result => {
    this.bankAccountTypes = result.data;
  },
  err => {
    console.log(err);
  }
);
}

addAccountType() {

this.accountService.addBankAccountType(this.accountModel).subscribe(
  result => {
    this.toastr.success(result.message);
    this.bankAccountTypes.push(this.accountModel);
    this.bankAccountTypes = [...this.bankAccountTypes]; // copy of array
    this.accountModel = {};
  },
  err => {
    console.log(err);
  }
);
return null;
}


/* @param companyId- delete company By Id */
onTypeDelete(id) {
  this.accountService.deleteBankAccountType(id).subscribe(
    result => {
    this.bankAccountTypes =  this.bankAccountTypes.filter(item => item.bankAccountTypeId !== id);
      this.toastr.success('Succefully Deleted !');
    },
    err => {
      console.log(err);
    }
  );
}

}
