import { Component, OnInit, ViewChild } from '@angular/core';
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { environment } from 'src/environments/environment';
import { HomeService } from 'src/app/_services/home.service';
import { UserCheckService } from 'src/app/_services/user-check.service';

@Component({
  selector: 'app-check-background',
  templateUrl: './check-background.component.html',
  styleUrls: ['./check-background.component.css']
})
export class CheckBackgroundComponent implements OnInit {

  constructor(private checkService: UserCheckService) { }
  p = 1;

images: any[] = [];

  public config: DropzoneConfigInterface = {
    url: `${environment.apiUrl}api/check/checkBacground-images`,
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
  this.getCheckBackgrounds();

  }

  getCheckBackgrounds() {
    // get admin uploaded images
    this.checkService.getBackgrounds().subscribe(
      result => {
          result.data.map(item => {
          if (item.uploadedByAdmin === true) {
            this.images.push(item);
           }
        });
      },
      err => {
        console.log(err.error);

      }
    );
  }


  deleteCheckBackground(id) {
    this.checkService.deleteCheckBackground(id).subscribe(
      result => {
        this.images =  this.images.filter(item => item.checkBackgroundId !== id);
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
    args[1].data.map(item =>  this.images.push(item) );
  }


}
