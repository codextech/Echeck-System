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
      console.log(res.profile.trustedUser);
      console.log(res.profile.Id);
     this.profileModel = res.profile; // populate our Form
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
      console.log(this.kycTypes);
    }, err => {
      this.toastr.error(err.message);
    });
  }

  onkycTypeChange(id) {
    const kycType = this.kycTypes.find(item => item.kycTypeId === id);
    this.kycDescription = kycType.kycTypeDescription;
  }

  onSending(_filesEvent): any {
    if (_filesEvent) {
       const formData = _filesEvent[2];
       formData.append('kycTypeId', this.kycModel.kycTypeId);
       console.log(this.kycModel.kycTypeId);
    }
  }

  updateProfile() {

  //   this.drpzoneRef.directiveRef.dropzone().processQueue();
  //  console.log(this.drpzoneRef.directiveRef.dropzone());

    // const formData = new FormData();
    // formData.append('image', this.profileModel.image);
    // formData.append('email', this.profileModel.email);
    // formData.append('firstName', this.profileModel.firstName);
    // formData.append('lastName', this.profileModel.lastName);
    this.userService.updateProfile(this.profileModel).subscribe(res => {
       this.toastr.success('Profile Updated');
        this.router.navigate(['/dashboard']);

    }, err => {
      console.log(err);
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
  this.drpzone.directiveRef.dropzone().processQueue();
}

  uploadKYCDoc() {

    const formData = new FormData();
    formData.append('kycDocument', this.kycModel.kycDocument);
    this.userService.uploadKycDoc(formData).subscribe(res => {
      this.messageAlert = true;
        console.log(res);

    }, err => {
      console.log(err);

    });
  }


  changePassword() {

      console.log(this.changePassModel);
      this.authService.changePassword(this.changePassModel).subscribe(res => {
          this.toastr.success(res.message);
          this.router.navigate(['/dashboard']);


      }, err => {
        this.toastr.error(err.error.message);
      });
    }

}
