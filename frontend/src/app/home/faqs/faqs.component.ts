import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/_services/cms.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {


  faqs: any[] = [];
  constructor(private cmsService: CmsService) { }

  ngOnInit() {
    this.getPageContent();
  }

  getPageContent() {
    this.cmsService.getAll()
      .subscribe(res => {
        const data = res.data;
        this.cmsService.cmsData = data;
        this.faqs = data.faqs;
      },
        err => {
          console.log(err);
        });
  }

}
