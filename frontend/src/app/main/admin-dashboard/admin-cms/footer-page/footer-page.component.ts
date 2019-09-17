import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CmsService } from 'src/app/_services/cms.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer-page',
  templateUrl: './footer-page.component.html',
  styleUrls: ['./footer-page.component.css']
})
export class FooterPageComponent implements OnInit {

  footerLinkModel: any = {};

  links : any[] = [];
  constructor(private cmsService: CmsService,
    private toastr: ToastrService,
     private ngxModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.getPageContent();
  }

  addFooterLink() {
    this.cmsService.save(this.footerLinkModel, 'footerlink').subscribe(result => {
      // clear model
        this.ngxModalService.close('FooterLinkModal');
      this.toastr.success('Added');
      this.links.push(this.footerLinkModel);
      this.footerLinkModel = {};
        }, err => {
      this.toastr.success('somethin wrong, Please Refresh Page!');
          console.log(err);
        });
  }

  deleteLink(id) {
      this.cmsService.delete(id, 'footerlink').subscribe( res => {
        this.links  = this.links.filter(item => item.id != id);
        this.toastr.success('Deleted');
      }, err => {
        console.log(err);
      });
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


}
