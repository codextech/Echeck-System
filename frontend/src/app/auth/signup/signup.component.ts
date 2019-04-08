import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpModel: any = {};
  constructor(private router: Router, private authService: UserAuthService) { }

  ngOnInit() {
  }

  signUp() {
    console.log(this.signUpModel);


    this.authService.userSignUp(this.signUpModel).subscribe(res => {
      console.log(res);
    this.router.navigateByUrl('/dashboard');
    }, err => {
      console.log(err);
    });

  }

}
