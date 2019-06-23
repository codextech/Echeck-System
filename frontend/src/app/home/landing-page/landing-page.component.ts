import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/_services/home.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  sliderImages: any[] = [];
  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getSliderImages();
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
