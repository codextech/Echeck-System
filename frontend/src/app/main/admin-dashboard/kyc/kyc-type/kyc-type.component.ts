import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/_services/config-datatable';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-kyc-type',
  templateUrl: './kyc-type.component.html',
  styleUrls: ['./kyc-type.component.css']
})
export class KycTypeComponent implements OnInit {

  kycTypes: any[] = [];
  kycModel: any = {};
  configuration = ConfigService.config;
  columns = [
    {
      key: 'kycType',
      title: 'Kyc Type',
    },

    {
      key: 'kycDescription',
      title: 'Description',
    },

    {
      key: 'actions', title: 'Actions'
    }
  ];

  constructor(private userService: UserService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getAccountTypes();
}

getAccountTypes() {
this.userService.getKycTypes().subscribe(
  result => {
    this.kycTypes = result.data;
  },
  err => {
    console.log(err);
  }
);
}

addKycType() {

this.userService.addKycType(this.kycModel).subscribe(
  result => {
    this.toastr.success(result.message);
    this.kycTypes.push(this.kycModel);
    this.kycTypes = [...this.kycTypes]; // copy of array
    this.kycModel = {};
  },
  err => {
    console.log(err);
  }
);
return null;
}


/* @param companyId- delete company By Id */
onTypeDelete(id) {
  this.userService.deleteKycType(id).subscribe(
    result => {
    this.kycTypes =  this.kycTypes.filter(item => item.kycTypeId !== id);
      this.toastr.success('Succefully Deleted !');
    },
    err => {
      console.log(err);
    }
  );
}
}
