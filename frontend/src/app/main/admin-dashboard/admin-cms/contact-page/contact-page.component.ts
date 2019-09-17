import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/_services/cms.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';
@Component({
  
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  
  contactModel: any = {};

  contacts: any[] = [];

  isContactEdit = false;
  constructor(private cmsService: CmsService,
    private toastr: ToastrService,
     private ngxModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.getPageContent();
  }

  addContact() {

    if (this.isContactEdit == false) { // add new
    this.cmsService.save(this.contactModel, 'contact').subscribe(result => {
      // clear model
      this.contactModel = {};
        this.ngxModalService.close('contactModal');
      this.toastr.success('Added');

        }, err => {
          console.log(err);
        });
    } else if (this.isContactEdit == true) { // update
      this.cmsService.edit(this.contactModel, 'contact').subscribe(result => {
        // clear model
        this.contactModel = {};
          this.ngxModalService.close('contactModal');
        this.toastr.success('Updated');
        location.reload();

          }, err => {
            console.log(err);
          });
    }

  }

  editContact(id) {
    this.isContactEdit = true;
    const model =  this.contacts.find(x => x.id == id);
    console.log(model);

    this.contactModel = model;
    this.ngxModalService.open('contactModal');
  }

  getPageContent() {
    this.cmsService.getAll()
      .subscribe(res => {
        const data = res.data;
        this.contacts = data.contacts;

      },
        err => {
          console.log(err);
        });
  }


  onIconPickerSelect(icon: string): void {
    console.log(icon);
    
    this.contactModel.icon = icon;
  }


}
