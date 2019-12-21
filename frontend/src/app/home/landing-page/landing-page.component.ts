import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HomeService } from 'src/app/_services/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { CmsService } from 'src/app/_services/cms.service';

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"]
})
export class LandingPageComponent implements OnInit {
  sliderImages: any[] = [];
  isEmailVerifiedToken: any;
  location: Location;

  homeIcon: any[] = [];
  contacts: any[] = [];
  appProcess: any[] = [];

  constructor(
    private homeService: HomeService,
    private cmsService: CmsService,
    private authService: UserAuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isEmailVerifiedToken = this.activatedRoute.snapshot.queryParamMap.get(
      "email_verified"
    );
    if (this.isEmailVerifiedToken) {
    this.saveUpdateToken();
    }

    this.getPageContent();

    if (!this.sliderImages) {
      setTimeout(() => {
        this.getSliderImages();
      }, 4000);
    }
  }

  // after email registrations
  saveUpdateToken() {
    if (this.isEmailVerifiedToken) {

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { email_verified: true },
        queryParamsHandling: 'merge' // remove to replace all query params by provided
      });
      this.authService.saveTokenAfterEmailVerification(
        this.isEmailVerifiedToken
      );
    }
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

  getPageContent() {
    this.cmsService.getAll().subscribe(
      res => {
        const data = res.data;
        this.cmsService.cmsData = data;
        this.homeIcon = data.homeIcons;
        this.contacts = data.contacts;
        this.appProcess = data.processes;
        // this.homeFooterComponent.loadFooterLinks(data.footerlinks);

      },
      err => {
        console.log(err);
      }
    );
  }
}
