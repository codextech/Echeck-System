import { Component, OnInit, ViewChild } from '@angular/core';
import htmlToImage from 'html-to-image';
import { ActivatedRoute } from '@angular/router';
import { UserCheckService } from 'src/app/_services/user-check.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-sp-signature',
  templateUrl: './add-sp-signature.component.html',
  styleUrls: ['./add-sp-signature.component.css']
})
export class AddSpSignatureComponent implements OnInit {

  checkModel: any = {};
  imagePreview: any;
  checkId: any;
  checkImage: any;

  @ViewChild('senderPartnerSign') container;
  signImage: any;

  constructor(private activatedRoute: ActivatedRoute,
    private ngxUiLoaderService: NgxUiLoaderService,
    private toastr: ToastrService,
              private checkService: UserCheckService) { }

  ngOnInit() {
    this.checkId = this.activatedRoute.snapshot.params.checkId;
    this.getCheckByCheckId();
  }



  getCheckByCheckId() {
    this.checkService.getCheckSignatureRequest(this.checkId).subscribe(result => {
        this.checkModel = result.data;
        console.log(this.checkModel);
      }, err => {
        console.log(err);
      }
    );
  }



  async completeCheckSign() {

    this.ngxUiLoaderService.startBackgroundLoader('master'); // Loader Start

    const fileName = Date.now();
    await this.convertToImage(fileName);
    this.ngxUiLoaderService.stopBackground();
    this.checkModel.checkImage = this.checkImage;
    const formData = new FormData();

    formData.append('checkImage', this.checkModel.checkImage); // check image after sign
    formData.append('signImage', this.checkModel.signImage); // check image after sign
    formData.append('checkId', this.checkModel.checkId); // check image after sign
    formData.append('checkImageId', this.checkModel.check_Image.checkImageId); // check image
    formData.append('signatureId', this.checkModel.signatureId);
    formData.append('billerId', this.checkModel.billerId);

    // if reciever ingo is not provided before
    formData.append('recieverEmail', this.checkModel.recieverEmail); // check image
    formData.append('recieverPhone', this.checkModel.recieverPhone); // check image

    this.checkService.addCheckFrontSecondSign(formData).subscribe(
      result => {

        this.toastr.success('Successfully Signed on Check ');        
        setTimeout(() => {
          window.location.href = `${environment.apiUrl}/dashboard`;
          }, 1500);
      },
      err => {
        console.log(err);
      });
  }


  async convertToImage(fileName) {
    const blob = await htmlToImage.toBlob(this.container.nativeElement);
    this.checkImage = new File([blob], fileName + '.png', {
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

    }
  }

}
