import { Component, OnInit } from '@angular/core';
import { UserAccountService } from 'src/app/_services/user-account.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ConfigService } from 'src/app/_services/config-datatable';

@Component({
  selector: 'app-add-signature',
  templateUrl: './add-signature.component.html',
  styleUrls: ['./add-signature.component.css']
})
export class AddSignatureComponent implements OnInit {

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
      key: 'signature',
      title: 'Account Signature'
    },
    {
      key: 'actions', title: ''
    }
  ];


  signatureModel: any = {};
  bankAccounts: any[] = [];
  signatures: any[] = [];
  signImage: any;

  isAccountSelected = false;
  edit = false;
  constructor(private accountService: UserAccountService,
    private ngxModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.getSignatures();
    setTimeout(() => {
    this.getBankAccounts();
 }, 1000);
  }

  getBankAccounts() {
    this.accountService.getBankAccounts().subscribe(
      result => {
        this.bankAccounts = result.data;
        this.bankAccounts.map(item => {
          const sign = this.signatures.filter(s => s.signatureId == item.signatureId);
          item.signatureImage = sign[0].signatureImage;
        });
        console.log(this.bankAccounts);
      },
      err => {}
    );
  }

  getSignatures() {
    this.accountService.getSignatures().subscribe(
      result => {
        console.log(result);
        this.signatures = result.data;
      },
      err => console.log(err)
    );
  }

  addSignature() {

    const formData = new FormData();

    this.signatureModel.signatureId = null; // temp
    formData.append('signatureId', this.signatureModel.signatureId); // in case if user choose selected sign
    formData.append('signImage', this.signatureModel.signImage);
    formData.append('bankAccountId', this.signatureModel.bankAccountId);
    this.accountService.addBankAccountSignature(formData).subscribe(result => {

      // temporay show image
    const bankAccount = this.bankAccounts.find(i => i.bankAccountId == this.signatureModel.bankAccountId);
    bankAccount.signatureImage = this.signImage;
    // clear model
    this.signatureModel = {};
    this.isAccountSelected = false; // disabled button
      this.ngxModalService.open('signModal');

      }, err => {
        console.log(err);

      });
  }


  onSignImagePicked(event) {
    const file = (event.target as any).files[0];
    if (file) {
      this.signatureModel.signImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.signImage = reader.result; // preview of image & change Check background Image
      };
      reader.readAsDataURL(file);

    }
  }

  cancelsignImage() {
    this.signImage = null;
  }

  onClickAddAnother() {
    this.signatureModel.bankAccountId = null;
    this.signImage = null;
  }


  onClickEditSign(id) {
    this.signatureModel.bankAccountId = id;
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.onChangeAcccount(id);
  }

  onChangeAcccount(id) {
    console.log(id);
    if (id != 0) {
    this.isAccountSelected = true;
    } else {
      this.isAccountSelected = false;
    }

  }

}
