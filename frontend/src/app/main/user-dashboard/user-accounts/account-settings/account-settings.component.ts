import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAccountService } from 'src/app/_services/user-account.service';

import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { DropzoneConfigInterface, DropzoneComponent } from 'ngx-dropzone-wrapper';
// define the constant url we would be uploading to.

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

 URL = 'http://localhost:3000/';

  @ViewChild(DropzoneComponent) drpzoneRef?: DropzoneComponent;

  // public config: DropzoneConfigInterface = {
  //   url: this.URL + 'api/account/update-profile',
  //   clickable: true,
  //   maxFiles: 1,
  //   autoReset: null,
  //   errorReset: null,
  //   cancelReset: 1,
  //   resizeWidth: 1024,
  //   resizeQuality: 0.8,
  // };

  profileModel: any = {};
  imagePreview: any;

  public uploader: FileUploader = new FileUploader({url: 'URL', itemAlias: 'image'});

  constructor(private accountService: UserAccountService) { }

  ngOnInit() {


     // user profile
    this.accountService.getUserProfile().subscribe(res => {
      console.log(res.profile);
     this.profileModel = res.profile; // populate our Form
    }, err => {
      console.log(err);
    });
  }

  updateProfile() {

  //   this.drpzoneRef.directiveRef.dropzone().processQueue();
  //  console.log(this.drpzoneRef.directiveRef.dropzone());

    const formData = new FormData();
    formData.append('image', this.profileModel.image);
    formData.append('email', this.profileModel.email);
    formData.append('firstName', this.profileModel.firstName);
    formData.append('lastName', this.profileModel.lastName);
    this.accountService.updateProfile(formData).subscribe(res => {
        console.log(res);

    }, err => {
      console.log(err);

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

  // uploads pic
  public onUploadSuccess(args: any): void {
    // console.log('onUploadSuccess:', args);
  }

  public onUploadError(args: any): void {
    // console.log('error:', args);
  }

}
