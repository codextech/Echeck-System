import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/_services/home.service';
import { ToastrService } from 'ngx-toastr';
import { CmsService } from 'src/app/_services/cms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  about: any;
  stories: any[] = [];
  contacts: any[] = [];
  constructor(private homeService: HomeService, private toastr: ToastrService,
    private cmsService: CmsService
    ) {
    }

  ngOnInit() {
    this.getPageContent();
  }

  getPageContent() {
    this.cmsService.getAll()
      .subscribe(res => {
        const data = res.data;
        this.cmsService.cmsData = data;
        this.stories = data.stories;
        this.contacts = data.contacts;
        this.about = data.about;

      },
        err => {
          console.log(err);
        });
  }

}
