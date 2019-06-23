import { Component, OnInit, ViewChild } from '@angular/core';
import { DropzoneConfigInterface, DropzoneComponent, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserCheckService } from 'src/app/_services/user-check.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-documents',
  templateUrl: './user-documents.component.html',
  styleUrls: ['./user-documents.component.css']
})
export class UserDocumentsComponent implements OnInit {


  docs: any[] = [];
  checkBackgrounds: any[] = [];
  kycDocs: any[] = [];
  p = 1;

  // filter
  docFilter: any = { documentName: null };

  public config: DropzoneConfigInterface = {
   url: `${environment.apiUrl}api/check/docs?userId=${this.authService.decodedtoken.Id}`,
    clickable: true,
    uploadMultiple: true,
    autoProcessQueue: false,
    parallelUploads: 100,
    createImageThumbnails: true,
    autoReset: 5000,
    errorReset: null,
    cancelReset: null,
    addRemoveLinks: true
  };

  @ViewChild(DropzoneComponent) drpzone?: DropzoneComponent;
  @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;


  constructor(private authService: UserAuthService,
              private userService: UserService,
              private checkService: UserCheckService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.dropzoneImageUploadInit();
    this.getDocumnets();
    this.getCheckBackgrounds();
    this.getKycDocuments();
  }

  dropzoneImageUploadInit() {
    this.config.init = function() {

      // this is not pointing to component, but to the dropzoneconfig
      this.on('processingmultiple', function(event) {
        // classThis.isUploading = true;
      });      // this is not pointing to component, but to the dropzoneconfig
      this.on('completemultiple', function(event) {
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

  getCheckBackgrounds() {
    this.checkService.getBackgrounds().subscribe(
      result => {
        console.log(result);
        result.data.map(item => {
          if (item.uploadedByAdmin == false) {
            this.checkBackgrounds.push(item);
          }
        });

      },
      err => console.log(err)
    );
  }




  getKycDocuments() {
    this.userService.getKycDocs(this.authService.getUserId).subscribe(
      result => {
        this.kycDocs = result.data;
      },
      err => {
        console.log(err);
      });
  }

 deleteDocument(id) {
    this.userService.deleteDocument(id).subscribe(
      result => {
        this.docs =  this.docs.filter(item => item.documentId !== id);
        this.toastr.success('Deleted !');
        console.log(result);

      },
      err => {
        console.log(err);
      });
  }

  deleteCheckBackground(id) {
    this.checkService.deleteCheckBackground(id).subscribe(
      result => {
        this.checkBackgrounds =  this.checkBackgrounds.filter(item => item.checkBackgroundId !== id);
        this.toastr.success('Deleted !');
        console.log(result);

      },
      err => {
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
    args[1].data.map(item =>  this.docs.push(item) );
  }
}
