import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/_services/cms.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  terms: any;
  constructor(private cmsService: CmsService) { }

  ngOnInit() {
    this.getPageContent();
  }

  getPageContent() {
    this.cmsService.getAll()
      .subscribe(res => {
        const data = res.data;
        this.cmsService.cmsData = data;
        this.terms = data.term.termText;
      },
        err => {
          console.log(err);
        });
  }
}
