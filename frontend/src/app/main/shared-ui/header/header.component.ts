import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserCheckService } from 'src/app/_services/user-check.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

recievedCheck: number;
signatoryChecksOfSender: number;
signatoryChecksOfReciever: number;
  constructor(public authService: UserAuthService,
              private router: Router,
              private toaster: ToastrService,
              private checkService: UserCheckService,
             ) { }

  ngOnInit() {
    this.unreadRecievedCheck();
    this.requestCheckSignatures();
    this.requestRecieverCheckSignatures();
  }


  unreadRecievedCheck() {
    this.checkService.getUnreadRecieveChecks().subscribe(
      result => {
        console.log(result);
        this.recievedCheck = result.data.length;
      },
      err => console.log(err)
    );
  }

  // for sender -> sign on check by sender Partner
  requestCheckSignatures() {
    this.checkService.getCheckSignatureRequests().subscribe(
      result => {
        console.log(result);
        this.signatoryChecksOfSender = result.data.length;
      },
      err => console.log(err)
    );
  }


  // for reciever

  requestRecieverCheckSignatures() {
    this.checkService.getRecieverCheckSignatureRequests().subscribe(
      result => {
        console.log(result);
        this.signatoryChecksOfReciever = result.data.length;
      },
      err => console.log(err)
    );
  }


  logout() {
    this.authService.decodedtoken = null;
    this.authService.usertoken = null;
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
    this.toaster.success('Logged out');
  }

}
