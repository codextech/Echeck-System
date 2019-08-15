import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HomeService } from 'src/app/_services/home.service';
import { ActivatedRoute } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  sliderImages: any[] = [];
  isEmailVerifiedToken: any;
  location: Location;
  constructor(private homeService: HomeService, private authService: UserAuthService,
     private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    // this.isEmailVerifiedToken = this.activatedRoute.snapshot.queryParamMap.get('emailVerified');
    // this.saveUpdateToken();
    this.getSliderImages();
  }

  // after email registrations
  saveUpdateToken() {

    if (this.isEmailVerifiedToken) {
     this.authService.saveTokenAfterEmailVerification(this.isEmailVerifiedToken);
    this.location.replaceState('/');
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
}
