import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/_services/cms.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent implements OnInit {

  faqModel: any = {};
  faqs : any[] = [];
  constructor(private cmsService: CmsService,
    private toastr: ToastrService,
     private ngxModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.getPageContent();
  }

  addFaq() {
    this.cmsService.save(this.faqModel, 'faq').subscribe(result => {
      // clear model
        this.ngxModalService.close('faqModal');
      this.toastr.success('Added');
      this.faqs.push(this.faqModel);
      this.faqModel = {};
        }, err => {
          console.log(err);
        });
  }

  deleteFaq(id) {
      this.cmsService.delete(id, 'faq').subscribe( res => {
       this.faqs = this.faqs.filter(item => item.id !== id);
        this.toastr.success('Deleted');
      }, err => {
        console.log(err);
      });
  }

  getPageContent() {
    this.cmsService.getAll()
      .subscribe(res => {
        const data = res.data;
        this.faqs = data.faqs;

      },
        err => {
          console.log(err);
        });
  }


}
