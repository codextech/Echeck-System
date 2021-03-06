import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CmsService } from 'src/app/_services/cms.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private cmsService: CmsService, public authService: UserAuthService) { }

  ngOnInit() {

    if (this.authService.isAdmin) {
      this.getCMSContent();
    }
  }

  getCMSContent() {
    this.cmsService.getAll()
      .subscribe(res => {
      },
        err => {
          console.log(err);
        });
  }



}
