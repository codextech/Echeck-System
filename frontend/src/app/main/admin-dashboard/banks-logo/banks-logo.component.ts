import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAccountService } from 'src/app/_services/user-account.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DropzoneConfigInterface, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banks-logo',
  templateUrl: './banks-logo.component.html',
  styleUrls: ['./banks-logo.component.css']
})
export class BanksLogoComponent implements OnInit {

  bankModel: any = {};
  logoImage: any;
  banksLogo: any[] = [];

  p = 1;

  // filter
  bankFilter: any = { bankLogo: null };

  public config: DropzoneConfigInterface = {
    url: `${environment.apiUrl}api/bank/logos`,
     clickable: true,
     uploadMultiple: true,
     autoProcessQueue: false,
     parallelUploads: 100,
     createImageThumbnails: true,
     autoReset: 5000,
     errorReset: null,
     cancelReset: null
   };


   @ViewChild(DropzoneComponent) drpzone?: DropzoneComponent;
  @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;


  constructor(private accountService: UserAccountService,
    private ngxModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.getBankLogos();

  }

  getBankLogos() {
    this.accountService.getBankLogos().subscribe(
      result => {
        this.banksLogo = result.data;
      },
      err => {}
    );
  }



  addBankLogo() {

    const formData = new FormData();

    formData.append('logoImage', this.bankModel.logoImage);
    formData.append('bankId', this.bankModel.bankId);
    this.accountService.updateBank(formData).subscribe(result => {
      this.ngxModalService.open('logoModal');


      }, err => {
        console.log(err);

      });
  }


  onSignImagePicked(event) {
    const file = (event.target as any).files[0];
    if (file) {
      this.bankModel.logoImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.logoImage = reader.result; // preview of image & change Check background Image
      };
      reader.readAsDataURL(file);

    }
  }



  uploadFiles() {
    this.drpzone.directiveRef.dropzone().processQueue();
  }

  Reset() {
    console.log('click Reset');

    this.bankModel.bankId = null;
    this.logoImage = null;
  }

}
