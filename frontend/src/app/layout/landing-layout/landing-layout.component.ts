import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute } from '@angular/router';
import { CmsService } from 'src/app/_services/cms.service';

@Component({
  selector: 'app-landing-layout',
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.css']
})
export class LandingLayoutComponent implements OnInit, AfterViewInit {

  constructor(private ngxUiLoaderService: NgxUiLoaderService,
              private cmsService: CmsService,
              private activatedRoute: ActivatedRoute) {
    // this.ngxUiLoaderService.start();
  }

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    this.cmsService.getAll()
      .subscribe(result => {
        console.log(result);
      }, err => {
        console.log(err);

      });


  }

  ngAfterViewInit() {

    // this.ngxUiLoaderService.stop();

}
}
