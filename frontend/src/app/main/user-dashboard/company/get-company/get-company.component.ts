import * as core from '@angular/core';
import { UserCompanyService } from 'src/app/_services/user-company.service';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';
import { ConfigService } from 'src/app/_services/config-datatable';
import { NgxSmartModalService } from 'ngx-smart-modal';

@core.Component({
  selector: 'app-get-company',
  templateUrl: './get-company.component.html',
  styleUrls: ['./get-company.component.css']
})
export class GetCompanyComponent implements core.OnInit {
  companies: any[] = [];
  companyModel: any = {};
  configuration = ConfigService.config;
  columns = [
    {
      key: 'company',
      title: 'Business Name',
    },

    {
      key: 'companyAddress',
      title: 'Address ',
    },
    {
      key: 'EIN',
      title: 'Tax Id/EIN'
    },
    {
      key: 'partnerEmail',
      title: 'Partner Email'
    },
    {
      key: 'actions', title: ''
    }
  ];

  constructor(
    private companyService: UserCompanyService,
    private toastr: ToastrService,
    private ngxModalService: NgxSmartModalService
  ) {}

  ngOnInit() {
        this.getCompanies();
  }

  getCompanies() {
    this.companyService.getUserCompany().subscribe(
      result => {
        this.companies = result.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  addCompany() {

    this.companyService.addUserCompany(this.companyModel).subscribe(
      result => {
        console.log(result);
        this.toastr.success(result.message);


        this.companyModel.Id = result.data[0].companyId;
        this.companies.push(this.companyModel);
        this.companies = [...this.companies]; // copy of array
        this.companyModel = {};
        this.ngxModalService.close('compModal');
      },
      err => {
        console.log(err);
      }
    );
    return null;
  }


  /* @param companyId- get details of single company */
  onCompanyEdit(id) {
    this.companyService.getUserCompanyById(id).subscribe(
      result => {
        this.companyModel = result.data;
      this.ngxModalService.open('updateModal');
      },
      err => {
        console.log(err);
      }
    );
  }

  updateCompany() {
    this.companyService.updateCompany(this.companyModel).subscribe(
      result => {
      // Find Index and update the object to that index
        const updatedItem = this.companies
          .find(item => item.Id === this.companyModel.Id);
        const index = this.companies.indexOf(updatedItem);
        this.companies[index] = this.companyModel;
      // Show Notification
        this.toastr.success('Succefully Edit !');
        this.ngxModalService.close('updateModal');
        this.companies = [...this.companies]; // copy of array
        this.companyModel = {};
      },
      err => {
        console.log(err);
      }
    );
  }





  /* @param companyId- delete company By Id */
  onCompanyDelete(id) {
    this.companyService.deleteCompany(id).subscribe(
      result => {
      this.companies =  this.companies.filter(item => item.Id !== id);
        this.toastr.success('Succefully Deleted !');
      },
      err => {
        console.log(err);
      }
    );
  }


}
