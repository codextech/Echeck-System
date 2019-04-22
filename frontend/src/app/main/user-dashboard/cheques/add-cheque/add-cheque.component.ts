import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAccountService } from 'src/app/_services/user-account.service';
import { UserCompanyService } from 'src/app/_services/user-company.service';
import { UserCheckService } from 'src/app/_services/user-check.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import domtoimage from 'dom-to-image'; // html to Image
import { RecieverService } from 'src/app/_services/reciever.service';

@Component({
  selector: 'app-add-cheque',
  templateUrl: './add-cheque.component.html',
  styleUrls: ['./add-cheque.component.css']
})
export class AddChequeComponent implements OnInit {
  checkModel: any = {};
  bankAccounts: any[] = [];
  companies: any[] = [];
  signatures: any[] = [];
  recievers: any[] = [];
  backgrounds: any[] = [];

  selectedCompany: any = {};
  selectedbankAccount: any = {};

  secondSignImage: any;

  checkBackgroundPreview: any; // check baground Image
  flipCheck = false;
  @ViewChild('checkContainer') container;
  checkImageFile: any;

  chequeBackground = '../../../../../assets/cheque-background/default.jpg';
  isBackSelected = false;
  constructor(
    private recieverService: RecieverService,
    private accountService: UserAccountService,
    private companyService: UserCompanyService,
    private checkService: UserCheckService,
    private ngxModalService: NgxSmartModalService,
  ) {}

  ngOnInit() {
    this.getCheckIssuedNumber();
    this.getBankAccounts();
    this.getCompanies();
    this.getSignatures();
    this.getReceivers();
    this.getCheckBackgrounds();
  }

  getCheckIssuedNumber() {
    this.checkService.getIssuedNumber().subscribe(
      result => {
        // this.checkNumber = result.data;
        this.checkModel.checkNumber = result.data;
        console.log(result.data);
      },
      err => console.log(err)
    );
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

  getSignatures() {
    this.accountService.getSignatures().subscribe(
      result => {
        console.log(result);
        this.signatures = result.data;
      },
      err => console.log(err)
    );
  }

  getReceivers() {
    this.recieverService.getRecievers().subscribe(
      result => {
        this.recievers = result.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  getCheckBackgrounds() {
    this.checkService.getBackgrounds().subscribe(
      result => {
        console.log(result);
        this.backgrounds = result.data;
      },
      err => console.log(err)
    );
  }
  // Add Check into Database

  async addCheck() {
    const fileName = this.checkModel.checkNumber;
    await this.convertToImage(fileName);
    console.log(this.checkImageFile);
    this.checkModel.checkImageFile = this.checkImageFile;

    /* Check is FOr Company or individual */

    // if (this.checkModel.individual) {
    //   this.checkModel.companyId = null;
    // } else {
    //   this.checkModel.individual = false;
    //   this.checkModel.senderName = null;
    //   this.checkModel.senderAddress = null;
    // }

    const formData = new FormData();

    formData.append('checkImage', this.checkModel.checkImageFile); // check image (dom to png)
    formData.append('backgroundImage', this.checkModel.checkBackgroundimage); // check bacground image
    formData.append('checkNumber', this.checkModel.checkNumber);
    formData.append('issuedDate', this.checkModel.issuedDate);
    formData.append('amount', this.checkModel.amount);
    formData.append('recieverName', this.checkModel.recieverName);
    formData.append('checkMemo', this.checkModel.checkMemo);
    formData.append('bankAccountId', this.checkModel.bankAccountId);
    // indivual
    formData.append('individual', this.checkModel.individual);
    formData.append('senderName', this.checkModel.senderName);
    formData.append('senderAddress', this.checkModel.senderAddress);
    // comapny
    formData.append('companyId', this.checkModel.companyId);
    // reviever
    formData.append('recieverEmail', this.checkModel.recieverEmail);
    formData.append('recieverPhone', this.checkModel.recieverPhone);
    // sneder Partner
    if (this.checkModel.senderPartnerEmail) {
    formData.append('senderPartnerEmail', this.checkModel.senderPartnerEmail);
    }

    // checkBackgroundId
    formData.append('checkBackgroundId', this.checkModel.checkBackgroundId);

    this.checkService.saveCheck(formData).subscribe(
      result => {
        console.log(result.data);
      },
      err => {
        console.log(err);
      }
    );
  }

  onChangeCompany(id) {
    // tslint:disable-next-line:triple-equals
    const comp = this.companies.find(x => x.Id == id);
    this.selectedCompany = {
      companyName: comp.companyName,
      address: comp.companyAddress
    };
  }

  onChangeBankAccount(id) {
    // tslint:disable-next-line:triple-equals
    const account = this.bankAccounts.find(x => x.bankAccountId == id);
    console.log(account);
    const sign = this.signatures.find(
      item => item.signatureId === account.signatureId
    );
    console.log(sign);

    this.selectedbankAccount = {
      routingNumber: account.bank.routingNumber,
      accountNumber: account.accountNumber,
      signature: sign.signatureImage
    };
  }

  onCheckBackgroundPicked(event) {
    const file = (event.target as any).files[0];
    if (file) {
      this.checkModel.checkBackgroundimage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.checkBackgroundPreview = reader.result; // preview of image & change Check background Image
      };
      reader.readAsDataURL(file);
         this.checkModel.checkBackgroundId = null; // user want to upload new background
       this.isBackSelected = false;


    }
  }

  onSignImagePicked() {
    const file = (event.target as any).files[0];
    if (file) {
      // this.checkModel.secondSignImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.secondSignImage = reader.result; // preview of image & change Check background Image
      };
      reader.readAsDataURL(file);

    }
  }

  onClickBackgroundImage(path) {
    this.chequeBackground = path;
  }

  onClickPersonalInfo(isPersonal) {
    console.log(isPersonal);

    if (isPersonal) {
      this.ngxModalService.open('personalInfo');
    }
  }

  async convertToImage(fileName) {
    const blob = await domtoimage.toBlob(this.container.nativeElement);
    this.checkImageFile = new File([blob], fileName + '.png', {
      type: 'image/png'
    }); // image File

  }

  onClickFlip() {
    this.flipCheck = !this.flipCheck;
  }



  selectedBackground(id) {
      const back = this.backgrounds.find(item => item.checkBackgroundId === id);
      this.checkModel.checkBackgroundId = back.checkBackgroundId;
      // change background of Check
        this.chequeBackground = back.Image;
      // css style
      this.isBackSelected = true;

  }



}
