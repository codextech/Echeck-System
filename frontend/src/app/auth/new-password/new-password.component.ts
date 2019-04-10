import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  model: any = {};
  token: any;
  constructor(private authService: UserAuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.token = this.activatedRoute.snapshot.params.token;
   this.getTokenValidity(this.token);
  }

  getTokenValidity(token) {
    this.authService.checkTokenValidity(token).subscribe(result => {
      console.log(result);
      this.model.userId = result.data;
    }, err => {
      console.log(err);
    });
  }

  setPassword() {
    this.model.token = this.token;
    this.authService.resetPassword(this.model).subscribe(result => {
      console.log(result);
      this.toastr.success('Password Updated');
      this.router.navigate(['/login']);
    });
  }



}
