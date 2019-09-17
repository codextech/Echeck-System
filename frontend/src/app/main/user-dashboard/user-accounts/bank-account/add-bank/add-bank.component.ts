import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAccountService } from 'src/app/_services/user-account.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NguCarouselConfig } from '@ngu/carousel';
import { DropzoneConfigInterface, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { environment } from 'src/environments/environment';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css']
})
export class AddBankComponent implements OnInit {

  @ViewChild('existingBankForm') existingBankForm; // form reference
  @ViewChild('bankForm') bankForm; // form reference

  constructor(private accountService: UserAccountService,
    private toastr: ToastrService,
    private authService: UserAuthService,
    private ngxModalService: NgxSmartModalService ) { }

bankModel: any = {};
banks: any[] = [];
bankLogos: any[] = [];
messageAlert = false;
newBank = true;
newLogo = true;
  public logoTiles: NguCarouselConfig = {
    grid: { xs: 3, sm: 3, md: 4, lg: 4, all: 0 },
    slide: 3,
    speed: 250,
    point: {
      visible: true
    },
    load: 3,
    velocity: 0,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  public config: DropzoneConfigInterface = {
    url: `${environment.apiUrl}api/bank?userId=${this.authService.getUserId}`,
     clickable: true,
     uploadMultiple: false,
     autoProcessQueue: false,
     createImageThumbnails: true,
     autoReset: 3000,
     errorReset: null,
     cancelReset: null,
     acceptedFiles: 'image/*',
     maxFiles: 1,
     addRemoveLinks: true
   };

   @ViewChild(DropzoneComponent) drpzone?: DropzoneComponent;
   @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;

   selctedBankLogoId: any;

   // new Logo
   bankLogoUploadContainer = false;
   isNewBankLogoUpload = false;




  ngOnInit() {
    this.getBankLogos();
    this.getBankList();
  }


  getBankLogos() {
    this.accountService.getBankLogos().subscribe(result => {
      console.log(result);
      this.bankLogos =  result.data;
    }, err => {
      this.toastr.error(err.message);
    });
  }

  getBankList() {
    this.accountService.getBanks().subscribe(result => {
    this.banks = result.data;

    }, err => console.log(err));
  }


  getBankDetails(routingNumber) {

      console.log(routingNumber);

      this.accountService.findBankByRoutingId(routingNumber).subscribe(result => {

        console.log(result);
        if (result.data) {
          const data =  result.data as any;
          this.bankModel = {
            address: data.address,
            phoneObject: data.telephone,
            city: data.city,
            zipCode: data.zipCode,
            bankName: data.bankName,
            routingNumber : data.routingNumber
          };
        } else {
          this.getBankByLiveApi(routingNumber); // look by Live api.
        }
      });

  }

  /* params Routing number, get details form 3rd paty APi */
  getBankByLiveApi(id) {

    this.accountService.getBankByRoutingId(id).subscribe(result => {
      // Fill form from Api Data
      const data  = result as any;
       this.bankModel = {
         address: data.address,
         phoneObject: data.telephone,
         city: data.city,
         zipCode: data.zip,
         bankName: data.customer_name,
         routingNumber : data.routing_number
       };
       this.messageAlert = true;

     }, err => {
       console.log(err);
       this.toastr.info('Something wrong with search ! Please give details manually.')
      });

  }



  addExistingBank() {

    if (this.bankModel == null || this.bankModel === {}) {

      this.accountService.addBank(this.bankModel).subscribe(result => {
        this.ngxModalService.open('bankaddModal');
        this.existingBankForm.resetForm();
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message);
    });
    } else {
      this.toastr.error('Please Select Bank');
    }


  }

  addNewBank() {
   console.log(this.bankForm.valid);
    
    if (this.isNewBankLogoUpload && this.selctedBankLogoId == null && this.bankForm.valid) {
        this.drpzone.directiveRef.dropzone().processQueue();
    } else if (this.isNewBankLogoUpload == false && this.selctedBankLogoId != null && this.bankForm.valid) {
/*   console.log(this.isNewBankLogoUpload);
  console.log(this.selctedBankLogoId); */

      this.accountService.addBank(this.bankModel).subscribe(result => {
        this.ngxModalService.open('bankaddModal');
        this.bankForm.resetForm();
      }, err => {
        console.log(err);
        this.toastr.error(err.error.message);
      });
    } else if(this.isNewBankLogoUpload == false && this.selctedBankLogoId == null) {
      this.toastr.error('Please Choose Bank Logo');
    } else if(this.isNewBankLogoUpload == true && this.selctedBankLogoId != null ) {
       this.toastr.error('Invalid: Adding more than one bank logo is not allowed');
    }
  }

  onSending(_filesEvent): any {

    if (_filesEvent) {
       const formData = _filesEvent[2];
       const number =  this.bankModel.phoneObject.number;
       formData.append('address', this.bankModel.address);
       formData.append('telephone', number);
       formData.append('city', this.bankModel.city);
       formData.append('zipCode', this.bankModel.zipCode);
       formData.append('routingNumber', this.bankModel.routingNumber);
       formData.append('bankName', this.bankModel.bankName);
    }

  }

    // after Bank is added
    public onUploadSuccess(args: any): void {
      console.log(args);

      this.ngxModalService.open('bankaddModal');
    }

    public onUploadError(args: any): void {
      this.toastr.error(args.message);
    }


  selectLogo(id) {

      const bankLogo = this.bankLogos.find(item => item.bankLogoId === id);
    this.bankModel.bankLogoId = bankLogo.bankLogoId;
   this.selctedBankLogoId = id;
      // this.toastr.error('You can not "Select Logo image" or "upload new Logo"  at a time');

}

unselectedLogo() {
  this.selctedBankLogoId = null;
}

SelectExisitingBank(value) {

  if (value == 0) {
    this.newBank = true;
  } else {
    this.newBank = false;

  }

}

// onClickNewLogoUpload(_filesEvent) {
//   if (_filesEvent) {
//   this.newLogo = true;
//   } else {
//   this.newLogo = false;
//   }
// }

  onClickAddAnother() {
    this.bankModel = {};
  }

  addedImageInDropZone(_filesEvent) {
    // console.log(_filesEvent);
    // this.LogoImageObject = _filesEvent.dataURL;
    this.newLogo = true;
    this.isNewBankLogoUpload = true;
  // this.selctedBankLogoId = null;
    // this.toastr.show('Logo Re');
  }

  removeImageFromZone(_filesEvent) {
    // this.LogoImageObject = null;
  // this.toastr.show('image removed');
  this.newLogo = false;
  this.isNewBankLogoUpload = false;

  }
}
