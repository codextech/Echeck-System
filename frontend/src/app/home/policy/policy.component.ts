import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/_services/cms.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  policy: any;
  constructor(private cmsService: CmsService) { }

  ngOnInit() {
    this.getPageContent();
  }

  getPageContent() {
    this.cmsService.getAll()
      .subscribe(res => {
        const data = res.data;
        this.cmsService.cmsData = data;
        if (data.policy) {
        this.policy = data.policy.policyText;
        } else {
          this.policy = '';
        }
      },
        err => {
          console.log(err);
        });
  }

}
