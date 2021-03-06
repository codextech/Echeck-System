import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit {

  constructor(private authService: UserAuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    // this.emailVerification();
  }

  emailVerification() {
    const token = this.activatedRoute.snapshot.queryParams.verifytoken;
    const email = this.activatedRoute.snapshot.queryParams.email;

    this.authService.verifyEmail(token, email).subscribe(result => {
      console.log(result);
      this.toastr.success(result.message);
    this.router.navigateByUrl('/dashboard');

    }, err => {
      console.log(err);
      this.toastr.error(err.message);
    });
  }

}
