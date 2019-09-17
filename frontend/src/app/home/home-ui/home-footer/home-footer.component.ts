import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/_services/home.service';
import { CmsService } from 'src/app/_services/cms.service';

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.css']
})
export class HomeFooterComponent implements OnInit {

  subscriberModel: any = {}
  links: any[] = [];
  constructor(private cmsService: CmsService, private toastr: ToastrService, private homeService: HomeService) { }


  ngOnInit() {
    this.getPageContent();
  }

  getPageContent() {
    this.cmsService.getAll()
      .subscribe(res => {
        const data = res.data;
        this.links = data.footerLinks;
      },
        err => {
          console.log(err);
        });
  }

  addSubscribe() {
    this.homeService.addsubscriber(this.subscriberModel).subscribe(
      result => {
        this.toastr.info('Thank you for Subscribe !');
        this.subscriberModel = {};
      },
      err => {
        console.log(err);
      }
    );
  return null;
  }
}
