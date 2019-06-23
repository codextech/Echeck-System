import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { ConfigService } from 'src/app/_services/config-datatable';

@Component({
  selector: 'app-kyc-requests',
  templateUrl: './kyc-requests.component.html',
  styleUrls: ['./kyc-requests.component.css']
})
export class KycRequestsComponent implements OnInit {

  kycRequests: any[] = [];

  configuration = ConfigService.config;
  columns = [
    {
      key: 'name',
      title: 'Name',
    },

    {
      key: 'email',
      title: 'Email'
    },
    {
      key: 'kyc',
      title: 'KYC Provided'
    },

    {
      key: 'actions',
      title: 'Details'
    },

  ];

    constructor(public userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }



  getUsers() {
    this.userService.getAllUsers().subscribe(
     res => {
       console.log(res.data);


         const kycRequests = res.data.filter( item => item.kycStatus === 'pending');
         this.kycRequests = [...kycRequests];
     },
     err => {
       console.log(err);
     }
   );
 }


}
