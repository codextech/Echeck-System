import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAccountService } from 'src/app/_services/user-account.service';

import { DropzoneConfigInterface, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {



  constructor(private userService: UserService,
    private authService: UserAuthService,
    private toastr: ToastrService,
    private router: Router) { }

  profileModel: any = {};
  imagePreview: any;
  accountVerification = false;


  // kyc

  kycTypes: any[] = [];
  kycDescription: any = null;

  public config: DropzoneConfigInterface = {
    url: `${environment.apiUrl}api/account/kyc?userId=${this.authService.decodedtoken.Id}`,
     clickable: true,
     uploadMultiple: true,
     autoProcessQueue: false,
     parallelUploads: 100,
     createImageThumbnails: true,
     autoReset: 5000,
     errorReset: null,
     cancelReset: null,

   };

   @ViewChild(DropzoneComponent) drpzone?: DropzoneComponent;
   @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;


  kycPreview: any;
  kycModel: any = {};
  messageAlert = false;

  // change password
  changePassModel: any = {};


  ngOnInit() {

    this.getKycTypes();

    this.getProfile();
    // DropZone on Sending
  //   this.drpzone.directiveRef.dropzone().on('sending', function(file, xhr, formData){


  // });
  }


  getProfile(){

     // user profile
     this.userService.getUserProfile().subscribe(res => {

     this.profileModel = res.profile; // populate our Form
     this.profileModel.phoneObject = this.profileModel.phone;
     if (res.profile.trustedUser) {
      this.accountVerification = false;
    } else {
      this.accountVerification = true;
    }
    }, err => {
      console.log(err);
    });
  }

  getKycTypes() {
    this.userService.getKycTypes().subscribe(res => {
      this.kycTypes = res.data;
    }, err => {
      this.toastr.error(err.message);
    });
  }

  onkycTypeChange(id) {
    const kycType = this.kycTypes.find(item => item.kycTypeId === id);
    this.kycDescription = kycType.kycTypeDescription;
  }

  onSending(_filesEvent): any {
    if (_filesEvent && this.kycModel.kycTypeId != undefined) {
       const formData = _filesEvent[2];
       formData.append('kycTypeId', this.kycModel.kycTypeId);
    } else {
      this.toastr.error('Please Select Type');
    }
  }

  updateProfile() {

    if (typeof this.profileModel.phoneObject === 'object' && this.profileModel.phoneObject !== null) {
      this.profileModel.phone = this.profileModel.phoneObject.number; // get telephone
      this.profileModel.countryCode = this.profileModel.phoneObject.countryCode;
    }
    this.userService.updateProfile(this.profileModel).subscribe(res => {
       this.toastr.success('Profile Updated');
        this.router.navigate(['/dashboard']);

    }, err => {
      this.toastr.error(err.error.message);

    });
  }

 public onImagePicked(event: Event) {
     const file =  (event.target as any).files[0];
     if (file) {
      this.profileModel.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
     }
  }

  // uploads kyc images success
  public onUploadSuccess(args: any): void {
    this.messageAlert = true;
  }

  public onUploadError(args: any): void {
    // console.log('error:', args);
  }

  // upload KYC Doc


  public onDocumentPicked(event: Event) {
    const file =  (event.target as any).files[0];
    if (file) {
     this.kycModel.kycDocument = file;
     const reader = new FileReader();
     reader.onload = () => {
       this.kycPreview = reader.result;
     };
     reader.readAsDataURL(file);
    }
 }



 uploadFiles() {
   if (this.kycModel.kycTypeId) {
  this.drpzone.directiveRef.dropzone().processQueue();
   } else {
    this.toastr.error('Please Select KYC Type');
   }
}

  uploadKYCDoc() {

    const formData = new FormData();
    formData.append('kycDocument', this.kycModel.kycDocument);
    this.userService.uploadKycDoc(formData).subscribe(res => {
      this.messageAlert = true;
    }, err => {
      console.log(err);

    });
  }


  changePassword() {

      if (this.changePassModel.newPassword != this.changePassModel.confirmPass) {
        this.toastr.error('password and confirm Password not matched');
      } else {

        this.authService.changePassword(this.changePassModel).subscribe(res => {
          this.toastr.success(res.message);
          this.router.navigate(['/dashboard']);


      }, err => {
        this.toastr.error(err.error.message);
      });
      }
    }

}
