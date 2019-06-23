import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-kyc-request',
  templateUrl: './kyc-request.component.html',
  styleUrls: ['./kyc-request.component.css']
})
export class KycRequestComponent implements OnInit {



  kycRequestModel: any = {};
  kycDocs: any[] = [];
  userId: any;
  kycTypes: any[] = [];

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];


  constructor(public userService: UserService,
              private router: Router,
              public activatedRoute: ActivatedRoute) { }


  ngOnInit() {

    this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      },
      {'previewZoom': true, 'previewRotate': true },
      { 'breakpoint': 500, 'width': '300px', 'height': '300px', 'thumbnailsColumns': 3 },
      { 'breakpoint': 300, 'width': '100%', 'height': '200px', 'thumbnailsColumns': 2 }
  ];
    this.userId = this.activatedRoute.snapshot.params.id;
    this.getkycDocs();
  }

  getkycDocs() {
    this.userService.getKycDocs(this.userId).subscribe(
      result => {
        this.kycDocs = result.data;

        // get all kyc types from array
        const types = [...this.kycDocs.slice(0, 3).map(item => item.kyc_type.kycType)];
        // filter to get unique kyc types
        this.kycTypes = Array.from(new Set(types));
        // images
        this.kycDocs.map(item => {
          this.galleryImages.push({
            small: item.document,
            medium: item.document,
            big: item.document,
          });
        });

      },
      err => {
        console.log(err);
      });
  }

  updateUserKycStatus() {
    this.userService.updateUserKycStatus(this.userId).subscribe(
      result => {

        this.router.navigateByUrl('admin/dashboard');
        },

      err => {
        console.log(err);
      });
  }

}
