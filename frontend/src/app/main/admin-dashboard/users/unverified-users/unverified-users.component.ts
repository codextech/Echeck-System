import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/_services/config-datatable';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-unverified-users',
  templateUrl: './unverified-users.component.html',
  styleUrls: ['./unverified-users.component.css']
})
export class UnverifiedUsersComponent implements OnInit {

  users: any[] = [];
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
      key: 'verified',
      title: 'Email Verified'
    },

    {
      key: 'kyc',
      title: 'KYC Provided'
    },

  ];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }


  getUsers() {
    this.userService.getAllUsers().subscribe(
     res => {
         const foundUsers = res.data.filter( item => item.isVerified === false || item.isVerified ===  null );
         this.users = [...foundUsers];
     },
     err => {
       console.log(err);
     }
   );
 }

}
