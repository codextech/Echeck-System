import { Component, OnInit } from '@angular/core';
import { UserAccountService } from 'src/app/_services/user-account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserCompanyService } from 'src/app/_services/user-company.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-edit-bank-account',
  templateUrl: './edit-bank-account.component.html',
  styleUrls: ['./edit-bank-account.component.css']
})
export class EditBankAccountComponent implements OnInit {

  accountModel: any = {};
  banks: any[] = [];
  companies: any[] = [];
  signatures: any[] = [];
  bankAccountTypes: any[] = [];

  imagePreview: any;
  signature: any;
  isSignSelected = false;


  // edit

  coSignatory: boolean;
  constructor(private accountService: UserAccountService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router,
              private companyService: UserCompanyService,
              private ngxModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.getBankList(); // bank dropdown
    this.getBankAccountType();
    // this.getcompanyList(); // user company drop down
    // this.getUserSignatures(); // user signatureHistory

    const bankAccountId = this.activatedRoute.snapshot.params.id;
    this.getBankAccountById(bankAccountId);

  }



  getBankList() {
    this.accountService.getBanks().subscribe(result => {
    console.log(result);
    this.banks = result.data;

    }, err => console.log(err));
  }

  getBankAccountType() {
    this.accountService.getBankAccountTypes().subscribe(result => {
      console.log(result);
    this.bankAccountTypes = result.data;

    }, err => console.log(err));
  }

  // getcompanyList() {
  //   this.companyService.getUserCompany().subscribe(result => {
  //   console.log(result);
  //   this.companies = result.data;

  //   }, err => console.log(err));
  // }

  // getUserSignatures() {
  //   this.accountService.getSignatures().subscribe(result => {
  //   console.log(result);
  //   this.signatures = result.data;

  //   }, err => console.log(err));
  // }

  getBankAccountById(bankAccountId) {
    console.log(bankAccountId);
    this.accountService.getBankAccountById(bankAccountId).subscribe(result => {
      this.accountModel = result.data;
      const accountType = this.bankAccountTypes.find( i => i.bankAccountTypeId === this.accountModel.accountTypeId);
      this.accountModel.accountTypeId  = accountType.bankAccountTypeId;
    });
  }



  updateBankAccount() {


    // formData.append('signatureId', this.accountModel.signatureId); // in case if user choose selected sign
    // formData.append('image', this.accountModel.image);
    // formData.append('bankId', this.accountModel.bankId);
    // formData.append('companyId', this.accountModel.companyId); //  companyId
    // formData.append('bankAccountId', this.accountModel.bankAccountId);
    // formData.append('accountName', this.accountModel.accountName);
    // formData.append('accountNumber', this.accountModel.accountNumber);
    // formData.append('userId', this.accountModel.userId);
    // console.log(formData);

    this.accountService.updateBankAccount(this.accountModel).subscribe(result => {
      this.toastr.success('Account Updated !');
      this.router.navigate(['/get/bank-accounts']);

      }, err => {
         this.toastr.error(err.error.message);
      });
  }

  // onImagePicked(event) {
  //   const file =  (event.target as any).files[0];
  //   if (file) {
  //    this.accountModel.image = file;
  //    const reader = new FileReader();
  //    reader.onload = () => {
  //     this.imagePreview = reader.result;
  //    };
  //    reader.readAsDataURL(file);
  //    this.accountModel.signatureId = null; // user want to upload new sign
  //  this.isSignSelected = false;
  //   }
  // }

  // selectedSign(id) {
  //  const sign = this.signatures.find(item => item.signatureId === id);
  //  this.accountModel.signatureId = sign.signatureId;
  //  this.isSignSelected = true;
  // }


  onClickIndividualAccount(indiv) {
    this.accountModel.businessAccount = false;
    if (indiv) {
      this.coSignatory = true;
      // this.ngxModalService.open('coPartnerMsg');
    } else{
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

  onClickAddAnother() {
    this.accountModel = {};
    return null;
  }
}
