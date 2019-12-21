import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/_services/cms.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-policy-page',
  templateUrl: './policy-page.component.html',
  styleUrls: ['./policy-page.component.css']
})
export class PolicyPageComponent implements OnInit {

  model: any = {};

  public tools: object = {
    items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
    'LowerCase', 'UpperCase', '|',
    'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
    'Outdent', 'Indent', '|',
    'CreateTable', 'CreateLink', '|', 'ClearFormat',
    'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
};

  constructor(private cmsService: CmsService,
     private toastr: ToastrService) { }

  ngOnInit() {
    // this.model.policyText = '';
    this.getPageContent();
  }

  addPolicy() {
    this.cmsService.save(this.model, 'policy').subscribe( res => {
      console.log(res);
      this.toastr.success('Policy Added');
    //   this.model = {};
    // this.model.policyText = '';

    }, err => {
      console.log(err);
    });

  }

  getPageContent() {
    this.cmsService.getAll()
      .subscribe(res => {
        const data = res.data;
        if (data.policy != null) {
          this.model.policyText = data.policy.policyText;
        } else {
          this.model.policyText = '';
        }
      },
        err => {
          console.log(err);
        });
  }

}
