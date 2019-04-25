import { Component, OnInit } from '@angular/core';
import { UserAccountService } from 'src/app/_services/user-account.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-add-signature',
  templateUrl: './add-signature.component.html',
  styleUrls: ['./add-signature.component.css']
})
export class AddSignatureComponent implements OnInit {

  signatureModel: any = {};
  bankAccounts: any[] = [];
  signatures: any[] = [];
  signImage: any;

  constructor(private accountService: UserAccountService,
    private ngxModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.getBankAccounts();
    this.getSignatures();
  }

  getBankAccounts() {
    this.accountService.getBankAccounts().subscribe(
      result => {
        this.bankAccounts = result.data;
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
      this.ngxModalService.open('signModal');


      }, err => {
        console.log(err);

      });
  }


  onSignImagePicked() {
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

  onClickAddAnother() {
    console.log('click anohter');

    this.signatureModel.bankAccountId = null;
    this.signImage = null;
  }

}
