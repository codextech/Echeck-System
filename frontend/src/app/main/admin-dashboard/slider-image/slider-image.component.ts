import { Component, OnInit, ViewChild } from '@angular/core';
import { DropzoneConfigInterface, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { environment } from 'src/environments/environment';
import { HomeService } from 'src/app/_services/home.service';

@Component({
  selector: 'app-slider-image',
  templateUrl: './slider-image.component.html',
  styleUrls: ['./slider-image.component.css']
})
export class SliderImageComponent implements OnInit {

  constructor(private homeService: HomeService) { }
  p = 1;

sliderImages: any[] = [];

  public config: DropzoneConfigInterface = {
    url: `${environment.apiUrl}api/home/slider`,
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



  ngOnInit() {
  this.getSliderImages();

  }

  getSliderImages() {
    this.homeService.getSliderImages().subscribe(
      result => {
        this.sliderImages = result.data;
      },
      err => {
        console.log(err.error);

      }
    );
  }


  deleteSlider(id) {
    this.homeService.deleteSliderImages(id).subscribe(
      result => {
        this.sliderImages =  this.sliderImages.filter(item => item.sliderId !== id);
        console.log(result);

      },
      err => {
        console.log(err);
      });
  }


  uploadFiles() {
    this.drpzone.directiveRef.dropzone().processQueue();
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
    args[1].data.map(item =>  this.sliderImages.push(item) );
  }


  public onUploadError(args: any): void {
    console.log('Error:', args);
  }
}
