import { Component, OnInit } from '@angular/core';
import { UserCheckService } from 'src/app/_services/user-check.service';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-recieved-check',
  templateUrl: './recieved-check.component.html',
  styleUrls: ['./recieved-check.component.css']
})
export class RecievedCheckComponent implements OnInit {

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

    saveAs(this.checkModel.check_Image.checkFront, 'Check Front' + this.checkModel.billerId + '.png');
    if (this.checkModel.check_Image.checkBack) {
      saveAs(this.checkModel.check_Image.checkBack, 'Check back' + this.checkModel.billerId +  '.png');
    }
    this.ngxUiLoaderService.stopBackground(); // Loader Start

  }


  downloadFile() {
    const file = this.checkModel.document;
    this.ngxUiLoaderService.startBackgroundLoader('master'); // Loader Start
    saveAs(file.documentUrl , file.documentName);
    this.ngxUiLoaderService.stopBackground(); // Loader Start
  }

  onClickFlip() {
    this.flipCheck = !this.flipCheck;
  }

}
