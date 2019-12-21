import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { FileExtentionPipe } from 'src/app/_pipe/file-extention.pipe';
import { ToastrService } from 'ngx-toastr';


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

  // images and Pdf
  filteredImages: any[] = [];
  filteredPdfs: any[] = [];

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];


  constructor(public userService: UserService,
              private router: Router,
              private toastr: ToastrService,
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

        if (this.kycDocs.length > 0) {
        console.log('this.kycDocs ', this.kycDocs );
        // get all kyc types from array
        let typeIds = [...this.kycDocs.map(item => item.kycTypeId)];

        // filter to get unique kyc types
        typeIds = Array.from(new Set(typeIds));

        this.kycDocs.forEach(el => {
          typeIds.forEach(id => {
            if (el.kycTypeId == id) {
              this.kycTypes.push(el.kyc_type);
            }
          });
        });

        // unique kyc Types
        this.kycTypes = this.kycTypes.filter(function(obj, index, self) {
          return (
            index ===
            self.findIndex(function(t) {
              return t['kycTypeId'] === obj['kycTypeId'];
            })
          );
        });

        this.onClickType(this.kycTypes[0].kycTypeId);

        } else {
          this.toastr.show('No Documents Found');
        }


      },
      err => {
        console.log(err);
      });
  }




  onClickType(id) {

    this.filteredImages = [];
    this.filteredPdfs = [];
    this.galleryImages = [];

    // filter by id
    let docs = this.kycDocs.filter(i => i.kycTypeId == id);
      // images
      const fileExtentionPipe = new FileExtentionPipe();

      docs.forEach(el => {
       const res = fileExtentionPipe.transform(el.document);
        if (res === true) { // image
          this.filteredImages.push(el);
        } else { // pdf
          this.filteredPdfs.push(el);
        }
      })

      // images
      this.filteredImages.map(item => {
        this.galleryImages.push({
          small: item.document,
          medium: item.document,
          big: item.document,
        });
      });

  }

  public onClickViewPdf(url) {
    window.open(url);
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
