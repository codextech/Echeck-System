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
    this.checkService.getUnreadRecieveCheck(this.checkId).subscribe(result => {
        this.checkModel = result.data;
        console.log(this.checkModel);
      }, err => {
        console.log(err);
      }
    );
  }

  downLoadCheck() {
    this.ngxUiLoaderService.start();
    saveAs(this.checkModel.check_Image.checkFront, 'Check Front' + this.checkModel.billerId + '.png');
    saveAs(this.checkModel.check_Image.checkBack, 'Check back' + this.checkModel.billerId +  '.png');
    this.ngxUiLoaderService.stop();
  }

  onClickFlip() {
    this.flipCheck = !this.flipCheck;
  }

}
