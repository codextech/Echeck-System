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
   };

   @ViewChild(DropzoneComponent) drpzone?: DropzoneComponent;
   @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;





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
    this.accountService.addBank(this.bankModel).subscribe(result => {
      this.ngxModalService.open('bankaddModal');

    }, err => {
      console.log(err);

      this.toastr.error(err.error.message);
    });

  }

  addNewBank() {

    if (this.newLogo) {
  this.drpzone.directiveRef.dropzone().processQueue();
    } else {
      this.accountService.addBank(this.bankModel).subscribe(result => {
        this.ngxModalService.open('bankaddModal');
      }, err => {
        console.log(err);

        this.toastr.error(err.error.message);
      });
    }
  }

  onSending(_filesEvent): any {
    console.log(this.authService.getUserId);

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
    this.newLogo = false;
}

SelectExisitingBank(value) {

  console.log(value);

  if (value == 0) {
    this.newBank = true;
  } else {
    this.newBank = false;

  }

}

onClickNewLogoUpload(_filesEvent) {
  if (_filesEvent) {
  this.newLogo = true;
  } else {
  this.newLogo = false;
  }
}

  onClickAddAnother() {
    this.bankModel = {};
  }
}
