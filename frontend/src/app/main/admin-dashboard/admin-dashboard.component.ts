import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { map } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashBoardComponent implements OnInit  {

  users: any[] = [];
  unVerifiedUsers: any[] = [];
  kycRequests: any[] = [];
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
    // this.kycRequest();
  }

  getUsers() {
     this.userService.getAllUsers().subscribe(
      res => {
        console.log(res.data);


          const foundUsers = res.data.filter( item => item.isVerified === false || item.isVerified ===  null );
          this.unVerifiedUsers = [...foundUsers];

          const kycRequests = res.data.filter( item => item.kycStatus === 'pending');
          this.kycRequests = [...kycRequests];

        this.users = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
