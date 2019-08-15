import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-layout',
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.css']
})
export class LandingLayoutComponent implements OnInit, AfterViewInit {

  constructor(private ngxUiLoaderService: NgxUiLoaderService,
              private activatedRoute: ActivatedRoute) {
    this.ngxUiLoaderService.start();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.ngxUiLoaderService.stop();

}
}
