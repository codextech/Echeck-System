import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpModel: any = {};
  checkToken: any;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: UserAuthService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.checkToken = this.activatedRoute.snapshot.queryParamMap.get('checkToken');
  }

  signUp() {
    this.authService.userSignUp(this.signUpModel, this.checkToken).subscribe(res => {
    this.router.navigateByUrl('/email-Verification');
    }, err => {
      this.toastr.error(err.error.message);
    });

  }

}
