import { Component, OnInit } from '@angular/core';
import { CmsService } from 'src/app/_services/cms.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  homeIconModel: any = {};
  iconImage: any;
  processImage: any;

  appProcessModel: any = {};
  homeIcon: any[] = [];
  appProcess: any[] = [];

  /* edit logic */

  isHomeIconEdit = false;
  isAppProcessEdit = false;

  constructor(private cmsService: CmsService,
    private toastr: ToastrService,
     private ngxModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.getPageContent();
  }

  /* ----------------Home Icon------------- */
  addHomeIcon() {
    const formData = new FormData();
    formData.append('image', this.homeIconModel.icon);
    formData.append('text', this.homeIconModel.text);

    if (this.isHomeIconEdit == false) {
      this.cmsService.save(formData, 'homeicon').subscribe(result => {
        this.homeIconModel = {};
          this.ngxModalService.close('homeIconModal');
          this.toastr.success('Added');
        location.reload();

          }, err => {
            console.log(err);
          this.toastr.error(err.error.message);

          });
    } else if (this.isHomeIconEdit == true) {
    formData.append('id', this.homeIconModel.id);

      this.cmsService.edit(formData, 'homeicon').subscribe(result => {
        // clear model
        this.homeIconModel = {};
          this.ngxModalService.close('homeIconModal');
          this.toastr.success('updated');
        location.reload();

          }, err => {
            console.log(err);
            this.toastr.error(err.error.message);
          });
    }




  }

  onIconImagePicked(event) {
    const file = (event.target as any).files[0];
    if (file) {
      this.homeIconModel.icon = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.iconImage = reader.result; // preview of image
      };
      reader.readAsDataURL(file);
    }
  }

  cancelIconImage() {
    this.iconImage = null;
    this.homeIconModel.icon = null;
  }


  /* ----------------Home Icon End------------- */

  /* ----------------Add App Process Steps------------- */

  onProcessImagePicked(event) {
    const file = (event.target as any).files[0];
    if (file) {
      this.appProcessModel.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.processImage = reader.result; // preview of image
      };
      reader.readAsDataURL(file);
    }
  }


  cancelProcessImage() {
    this.processImage = null;
    this.appProcessModel.image = null;
  }

  addAppProcess() {

    const formData = new FormData();
    formData.append('image', this.appProcessModel.image);
    formData.append('text', this.appProcessModel.text);
    formData.append('title', this.appProcessModel.title);

    if (this.isAppProcessEdit == false) { // add new
    this.cmsService.save(formData, 'process').subscribe(result => {
      // clear model
      this.appProcessModel = {};
        this.ngxModalService.close('appProcessModal');
      this.toastr.success('Added');

      setTimeout(() => {
        location.reload();
      }, 1500);

        }, err => {
          console.log(err);
          this.toastr.error(err.error.message);

        });
    } else if (this.isAppProcessEdit == true) { // update
    formData.append('id', this.appProcessModel.id);
      this.cmsService.edit(formData, 'process').subscribe(result => {
        // clear model
        this.appProcessModel = {};
          this.ngxModalService.close('appProcessModal');
        this.toastr.success('Updated');
        setTimeout(() => {
          location.reload();
        }, 1500);

          }, err => {
            console.log(err);
          });
    }

  }

  /* ----------------End App Process Steps------------- */



  getPageContent() {
    this.cmsService.getAll()
      .subscribe(res => {
        const data = res.data;
        console.log(data);

        this.homeIcon = data.homeIcons;
        this.appProcess = data.processes;

      },
        err => {
          console.log(err);
        });
  }




  /* Edit Content */

  editHomeIcon(id) {

    this.isHomeIconEdit =  true;
    const model =  this.homeIcon.find(x=> x.id == id);
    this.homeIconModel = model;
    this.ngxModalService.open('homeIconModal');

  }

  editAppProcess(id) {

    this.isAppProcessEdit = true;
    const model =  this.appProcess.find(x => x.id == id);
    console.log(model);
    this.appProcessModel = model;
    this.ngxModalService.open('appProcessModal');

  }




}
