import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/_services/home.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CmsService } from 'src/app/_services/cms.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactModel: any = {};
  contacts: any[] = [];
  constructor(private homeService: HomeService, private toastr: ToastrService,
    private cmsService: CmsService,
    private router: Router
    ) {
   }

  ngOnInit() {
    this.getPageContent();
  }

  addMessage() {
    this.homeService.addContact(this.contactModel).subscribe(
      result => {
        this.toastr.success('Thank you!, we will contact you soon');
        this.router.navigate(['/']);

      },
      err => {
        console.log(err);
      }
    );
  return null;
  }


  getPageContent() {
    this.cmsService.getAll()
      .subscribe(res => {
        const data = res.data;
        this.cmsService.cmsData = data;
        this.contacts = data.contacts;
      },
        err => {
          console.log(err);
        });
  }


}
