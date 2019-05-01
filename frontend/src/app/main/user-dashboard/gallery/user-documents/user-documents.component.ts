import { Component, OnInit, ViewChild } from '@angular/core';
import { DropzoneConfigInterface, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserCheckService } from 'src/app/_services/user-check.service';

@Component({
  selector: 'app-user-documents',
  templateUrl: './user-documents.component.html',
  styleUrls: ['./user-documents.component.css']
})
export class UserDocumentsComponent implements OnInit {


  docs: any[] = [];
  p = 1;

  // filter
  docFilter: any = { documentName: null };

  public config: DropzoneConfigInterface = {
   url: `http://localhost:3000/api/check/docs?userId=${this.authService.decodedtoken.Id}`,
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

  myDropzone: any;

  constructor(private authService: UserAuthService,
              private checkService: UserCheckService) { }

  ngOnInit() {
    this.dropzoneImageUploadInit();
    this.getDocumnets();
  }

  dropzoneImageUploadInit() {
    this.config.init = function() {

      // this is not pointing to component, but to the dropzoneconfig
      this.on('processingmultiple', function(event) {
        console.log('From init. Processing multiple ------> ', event);
        // classThis.isUploading = true;
      });      // this is not pointing to component, but to the dropzoneconfig
      this.on('completemultiple', function(event) {
        console.log('From init. complete multiple ------> ', event);
        // classThis.isUploading = false;
      });
    };
  }

  getDocumnets() {
    this.checkService.getuserDocumnets().subscribe(result => {
      this.docs = result.data;
      console.log(this.docs);

    }, err => {
      console.log(err);
    });
  }


  uploadFiles() {
    this.drpzone.directiveRef.dropzone().processQueue();
  }


  public onUploadInit(args: any): void {
    console.log('onUploadInit:', args);
  }


  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }
}
