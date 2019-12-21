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

    this.cmsService.currentCmsData.subscribe(currentData => this.loadFooterLinks(currentData))

  }

  // getPageContent() {
  //   debugger
  //   this.cmsService.currentCmsData
  //     .subscribe(res => {
  //       if (res) {

  //         console.log(' ok');

  //         const data = res.data;
  //         this.links = data.footerLinks;

  //       }
  //       console.log('not ok');


  //     },
  //       err => {
  //         console.log(err);
  //       });
  // }

  addSubscribe() {
    this.homeService.addsubscriber(this.subscriberModel).subscribe(
      result => {
        this.toastr.info('Thank you for your subscription');
        this.subscriberModel = {};
      },
      err => {
        console.log(err);
      }
    );
  return null;
  }


 public loadFooterLinks(links) {
    this.links = links;
  }

}
