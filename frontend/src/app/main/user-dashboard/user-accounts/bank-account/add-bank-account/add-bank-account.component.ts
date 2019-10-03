import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserAccountService } from 'src/app/_services/user-account.service';
import { UserCompanyService } from 'src/app/_services/user-company.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ConfigService } from 'src/app/_services/config-datatable';
@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrls: ['./add-bank-account.component.css']
})
export class AddBankAccountComponent implements OnInit {

  @ViewChild('accountForm') accountForm; // form reference


  accountModel: any = {};
  banks: any[] = [];
  companies: any[] = [];
  bankAccountTypes: any[] = [];
  signatures: any[] = [];
  imagePreview;
  selectedImage: any;
  isSignSelected = false;
  coSignatory = false;


  /* Bank Acounts */

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
    private companyService: UserCompanyService,
    private toastr: ToastrService,
    private ngxModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.getBankList(); // bank dropdown
    this.getBankAccountType(); // bank account Type dropdown
    this.getCompanies();
    this.getBankAccounts();
    //  this.getcompanyList(); // user company drop down
    //  this.getUserSignatures(); // user signatureHistory

    this.accountModel.individualAccount = false;
     this.accountModel.businessAccount = false;
  }

  // saved Bank accounts of user
  getBankAccounts() {
    this.accountService.getBankAccounts().subscribe(result => {
      this.accounts = result.data;
      console.log(this.accounts);
    }, err => {
    });
  }

  onDeleteAccount(id) {
    this.accountService.deleteBankAccount(id).subscribe(result => {
      console.log(result);
      this.accounts = this.accounts.filter(item => item.bankAccountId !== id);
      this.toastr.success('Deleted SuccesFully');

    }, err => {

    });
  }


  getBankList() {
    this.accountService.getBanks().subscribe(result => {
      this.banks = result.data;

    }, err => console.log(err));
  }


  getBankAccountType() {
    this.accountService.getBankAccountTypes().subscribe(result => {
      console.log(result);
      this.bankAccountTypes = result.data;

    }, err => console.log(err));
  }

  getCompanies() {
    this.companyService.getUserCompany().subscribe(
      result => {
        this.companies = result.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  getUserSignatures() {
    this.accountService.getSignatures().subscribe(result => {
      console.log(result);
      this.signatures = result.data;

    }, err => console.log(err));
  }
  // ----- adding Bank account ->
  /*
      @params userId
  */

  addBankAccount() {

    const indiv = this.accountModel.individualAccount;
    const busi = this.accountModel.businessAccount;

    if ((indiv != false || busi != false) && this.accountForm.valid) {

      this.accountService.addBankAccount(this.accountModel).subscribe(result => {
        // this.router.navigate(['/get/bank-accounts']);
        this.ngxModalService.open('bankAccountModal');
        this.accountForm.resetForm();
      }, err => {
        this.toastr.error(err.error.message);
      });
    } else {
      this.toastr.error("Please Select 'Individual' OR 'Business'")
    }


  }

  onImagePicked(event) {
    const file = (event.target as any).files[0];
    if (file) {
      this.accountModel.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      this.accountModel.signatureId = null; // user want to upload new sign
      this.isSignSelected = false;
    }
  }

  selectedSign(id) {
    const sign = this.signatures.find(item => item.signatureId === id);
    this.accountModel.signatureId = sign.signatureId;
    this.isSignSelected = true;
  }

  onClickAddAnother() {
    this.accountModel = {};
    return null;
  }


  onClickIndividualAccount(indiv) {
    this.accountModel.businessAccount = false;
    this.accountModel.companyId = null;

    if (indiv) {
      this.coSignatory = true;
      // this.ngxModalService.open('coPartnerMsg');
    } else {
      this.coSignatory = false;
    }
  }


  onClickBusinessAccount(business) {
    this.accountModel.individualAccount = false;
    if (business) {
      this.ngxModalService.open('businessDropDown');
    }
  }

  onClickCoPartnerInfo(option: boolean) {
    this.accountModel.isIndividualCoPartner = option;
  }
}
