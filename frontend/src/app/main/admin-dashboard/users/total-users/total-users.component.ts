import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/_services/config-datatable';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-total-users',
  templateUrl: './total-users.component.html',
  styleUrls: ['./total-users.component.css']
})
export class TotalUsersComponent implements OnInit {

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
       this.users = res.data;
     },
     err => {
       console.log(err);
     }
   );
 }

}
