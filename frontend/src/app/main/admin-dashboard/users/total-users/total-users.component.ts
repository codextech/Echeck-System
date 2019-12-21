import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/_services/config-datatable';
import { UserService } from 'src/app/_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
      title: 'KYC Status'
    },

    {
      key: 'send',
      title: 'Send Email'
    },
    {
      key: 'actions',
      title: ''
    },
  ];

  constructor(private userService: UserService,
    private router: Router,
     private toastr: ToastrService) { }

  ngOnInit() {
    this.getUsers();
  }


  getUsers() {
    this.userService.getAllUsers().subscribe(
     res => {
       this.users = res.data;
       console.log( this.users);

     },
     err => {
       console.log(err);
     }
   );
 }

 onClickSuspendUser(id) {
  this.userService.suspendUser(id).subscribe(
    res => {
     this.toastr.success(res.message);
    },
    err => {
      console.log(err);
     this.toastr.success(err.error);

    }
  );
 }

 onClickDeleteUser(id) {
  this.userService.deleteUser(id).subscribe(
    res => {
     this.toastr.success(res.message);
    },
    err => {
      console.log(err);
     this.toastr.success(err.error);
    }
  );
 }

 onClickKYCDetails(userId) {
  this.router.navigateByUrl(`admin/kyc-request/${userId}`);

 }
}
