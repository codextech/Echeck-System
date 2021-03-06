import { Component, OnInit, ViewChild } from '@angular/core';
import htmlToImage from 'html-to-image';

import { ActivatedRoute } from '@angular/router';
import { UserCheckService } from 'src/app/_services/user-check.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-rp-signature',
  templateUrl: './add-rp-signature.component.html',
  styleUrls: ['./add-rp-signature.component.css']
})
export class AddRpSignatureComponent implements OnInit {


  checkModel: any = {};

  flipCheck = false;
  checkId: any;
  imagePreview: any;

  @ViewChild('checkBackContainer') container;
  checkBackImageFile: any;
  constructor(private checkService: UserCheckService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.checkId = this.activatedRoute.snapshot.params.checkId;
    this.getCheckByCheckId();

  }


  getCheckByCheckId() {
    this.checkService.getRecieverCheckSignatureRequest(this.checkId).subscribe(result => {
        this.checkModel = result.data;
        console.log(this.checkModel);
      }, err => {
        console.log(err);
      }
    );
  }


  async completeReciverCheckSign() {


    this.ngxUiLoaderService.startBackgroundLoader('master'); // Loader Start
    const fileName = Date.now();
    await this.convertToImage(fileName);
    this.ngxUiLoaderService.stopBackground();
    this.checkModel.checkBackImage = this.checkBackImageFile;
    const formData = new FormData();

    formData.append('signImage', this.checkModel.signImage); // reciever sign image
    formData.append('checkBackImage', this.checkModel.checkBackImage); // check back image
    formData.append('checkImageId', this.checkModel.check_Image.checkImageId);
    formData.append('checkId', this.checkModel.checkId);
    formData.append('signatureId', this.checkModel.signatureId); // if selected sign

    this.checkService.addCheckBackSecondSign(formData).subscribe(
      result => {
        console.log(result.data);
        this.toastr.success('Successfully Signed on Check ');
        setTimeout(() => {
          window.location.href = `${environment.apiUrl}/dashboard`;
          }, 1500);
        // ${environment.apiUrl}
      },
      err => {
        console.log(err);
      });

  }

  async convertToImage(fileName) {
    const blob = await htmlToImage.toBlob(this.container.nativeElement);
    this.checkBackImageFile = new File([blob], fileName + '.png', {
      type: 'image/png'
    }); // image File
  }



  onImagePicked(event) {
    const file =  (event.target as any).files[0];
    if (file) {
     this.checkModel.signImage = file;
     const reader = new FileReader();
     reader.onload = () => {
      this.imagePreview = reader.result;
     };
     reader.readAsDataURL(file);
     this.onClickFlip();

    }
  }

  onClickFlip() {
    this.flipCheck = !this.flipCheck;
  }

  cancelImagePreview() {
    this.imagePreview = null;
    this.onClickFlip();
  }
}
