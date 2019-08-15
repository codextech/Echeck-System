import { Component, OnInit } from '@angular/core';
import { UserCheckService } from 'src/app/_services/user-check.service';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-sent-check',
  templateUrl: './sent-check.component.html',
  styleUrls: ['./sent-check.component.css']
})
export class SentCheckComponent implements OnInit {


  checkModel: any = {};
  flipCheck = false;
  constructor(private checkService: UserCheckService,
    private activatedRoute: ActivatedRoute,
    private ngxUiLoaderService: NgxUiLoaderService) { }

 checkId: any;
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

  downLoadCheck() {
    this.ngxUiLoaderService.startBackgroundLoader('master'); // Loader Start

    saveAs(this.checkModel.check_Image.checkFront, 'Check Front-' + this.checkModel.billerId + '.png');
    if (this.checkModel.check_Image.checkBack) {
    saveAs(this.checkModel.check_Image.checkBack, 'Check Back-' + this.checkModel.billerId +  '.png');
    }
    this.ngxUiLoaderService.stopBackground(); // Loader Start

  }

  downloadFile() {
    if(this.checkModel.document){
      const file = this.checkModel.document;
      this.ngxUiLoaderService.startBackground();
      saveAs(file.documentUrl , file.documentName);
      this.ngxUiLoaderService.stopBackground();
    }

  }

  onClickFlip() {
    this.flipCheck = !this.flipCheck;
  }

}
