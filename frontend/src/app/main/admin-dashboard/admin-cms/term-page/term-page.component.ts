import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/_services/cms.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-term-page',
  templateUrl: './term-page.component.html',
  styleUrls: ['./term-page.component.css']
})
export class TermPageComponent implements OnInit {

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
    // this.model.termText = '';
    this.getPageContent();
  }


  addTerm() {
    this.cmsService.save(this.model, 'term').subscribe( res => {
      this.toastr.success('Terms Added');
    // this.model.termText = '';

    }, err => {
      console.log(err);
    });

  }



  getPageContent() {
    this.cmsService.getAll()
      .subscribe(res => {
        const data = res.data;
        if (data.term != null) {
          this.model.termText = data.term.termText;
        } else {
          this.model.termText = '';
        }
      },
        err => {
          console.log(err);
        });
  }

}
