import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserAccountService } from 'src/app/_services/user-account.service';
import { UserCompanyService } from 'src/app/_services/user-company.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.component.html',
  styleUrls: ['./add-bank-account.component.css']
})
export class AddBankAccountComponent implements OnInit {


  accountModel: any = {};
  banks: any[] = [];
  companies: any[] = [];
  signatures: any[] = [];
  imagePreview;
  selectedImage: any;
  isSignSelected = false;

  constructor(private accountService: UserAccountService,
              private companyService: UserCompanyService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit() {
     this.getBankList(); // bank dropdown
     this.getcompanyList(); // user company drop down
     this.getUserSignatures(); // user signatureHistory
  }


  getBankList() {
    this.accountService.getBanks().subscribe(result => {
    console.log(result);
    this.banks = result.data;

    }, err => console.log(err));
  }

  getcompanyList() {
    this.companyService.getUserCompany().subscribe(result => {
    console.log(result);
    this.companies = result.data;

    }, err => console.log(err));
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

    const formData = new FormData();

    formData.append('signatureId', this.accountModel.signatureId); // in case if user choose selected sign
    formData.append('image', this.accountModel.image);
    formData.append('bankId', this.accountModel.bankId);
    formData.append('Id', this.accountModel.Id); // companyuId
    formData.append('accountName', this.accountModel.accountName);
    formData.append('accountNumber', this.accountModel.accountNumber);
    formData.append('isSubAccount', this.accountModel.isSubAccount);
    formData.append('subAccountNumber', this.accountModel.subAccountNumber);
    this.accountService.addBankAccount(formData).subscribe(result => {
      this.toastr.success('Account Added !');
      this.router.navigate(['/get/bank-accounts']);

      }, err => {
         this.toastr.error(err.error.message);
      });
  }

  onImagePicked(event) {
    const file =  (event.target as any).files[0];
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

}
