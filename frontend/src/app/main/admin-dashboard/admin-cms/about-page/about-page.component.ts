import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/_services/cms.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  model: any = {};
  storyModel: any = {};
  stories : any[] = [];

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
    this.model.aboutText = '';
    this.getPageContent();
  }

  addAbout() {
    this.cmsService.save(this.model, 'about').subscribe( res => {
      this.toastr.success('About Content Added');
    //   this.model = {};
    // this.model.aboutText = '';
    }, err => {
      console.log(err);
    });

  }

  addStory() {
    this.cmsService.save(this.storyModel, 'story').subscribe( res => {
      this.toastr.success('Added');
      this.stories.push(this.storyModel);
      this.storyModel = {};

    }, err => {
      console.log(err);
    });
  }

  deleteStory(id) {
    this.cmsService.delete(id, 'story').subscribe( res => {
     this.stories = this.stories.filter(item => item.id !== id);
      this.toastr.success('Deleted');

    }, err => {
      console.log(err);
    });
  }

  getPageContent() {
    this.cmsService.getAll()
      .subscribe(res => {
        const data = res.data;
        this.stories = data.stories;
        if (data.about != null) {
          this.model.aboutText = data.about.aboutText;
        } else {
          this.model.aboutText = '';
        }

      },
        err => {
          console.log(err);
        });
  }

}
