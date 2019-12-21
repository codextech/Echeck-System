import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { CmsService } from 'src/app/_services/cms.service';


@Component({
  selector: 'app-userdashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']

})
export class AdminDashBoardComponent implements OnInit  {

  users: any[] = [];
  unVerifiedUsers: any[] = [];
  kycRequests: any[] = [];
  constructor(public userService: UserService, private cmsService : CmsService) {}

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
