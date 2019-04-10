import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  model: any = {};
  constructor(private authService: UserAuthService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  resetPass() {
      this.authService.sendEmailForReset(this.model).subscribe(result => {
        this.toastr.info('Please ! Check your Email');
      }, err => {
        this.toastr.error(err.message);
        console.log(err);
      }) ;
  }

}
