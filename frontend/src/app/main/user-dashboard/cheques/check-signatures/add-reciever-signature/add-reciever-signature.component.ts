import { Component, OnInit, ViewChild } from '@angular/core';
import { UserCheckService } from 'src/app/_services/user-check.service';
import { ActivatedRoute } from '@angular/router';
import htmlToImage from 'html-to-image';

import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-reciever-signature',
  templateUrl: './add-reciever-signature.component.html',
  styleUrls: ['./add-reciever-signature.component.css']
})
export class AddRecieverSignatureComponent implements OnInit {


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
    this.checkService.getCheckById(this.checkId).subscribe(result => {
        this.checkModel = result.data;
        console.log(this.checkModel);
      }, err => {
        console.log(err);
      }
    );
  }


  async addCheckBack() {


    this.ngxUiLoaderService.startBackgroundLoader('master'); // Loader Start
    const fileName = Date.now();
    await this.convertToImage(fileName);
    this.ngxUiLoaderService.stopBackground(); // stop loader
    this.checkModel.checkBackImage = this.checkBackImageFile;
    const formData = new FormData();

    formData.append('signImage', this.checkModel.signImage); // reciever sign image
    formData.append('checkBackImage', this.checkModel.checkBackImage); // check back image
    formData.append('checkImageId', this.checkModel.check_Image.checkImageId);
    formData.append('checkId', this.checkModel.checkId);
    formData.append('signatureId', this.checkModel.signatureId); // if selected sign
    // reciever need for second sign from his partner
    if (!this.checkModel.recieverPartnerEmail) {
      this.checkModel.recieverPartnerEmail = ''; // if email not present
    }
    formData.append('recieverPartnerEmail', this.checkModel.recieverPartnerEmail);

    this.checkService.addCheckBack(formData).subscribe(
      result => {
        window.location.href = `${environment.apiUrl}/dashboard`;
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message);
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

    }
  }

  onClickFlip() {
    this.flipCheck = !this.flipCheck;
  }
}
