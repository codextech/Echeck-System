import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

usertoken: any;
decodedtoken: any = '';
jwtHelper: JwtHelperService = new JwtHelperService();


constructor(private http: HttpClient) { }

userLogIn(model) {
return this.http.post<any>(environment.apiUrl + 'api/auth/login', model).pipe(
  map(result => {
    if (result) {
      localStorage.setItem('access_token', result.token);
      this.decodedtoken = this.jwtHelper.decodeToken(result.token);
      this.usertoken = result.token;
    }
  })
);
}


userSignUp(model, checkToken) {
  return this.http.post<any>(environment.apiUrl  + 'api/auth/signup', model, {
    params: {checkToken: checkToken}
  }).pipe(
    map(result => {
      if (result) {
        localStorage.setItem('access_token', result.token);
        this.decodedtoken = this.jwtHelper.decodeToken(result.token);
        this.usertoken = result.token;
      }
    })
  );
  }


// email verification

verifyEmail(token, email) {
  return this.http.get<any>(environment.apiUrl  + 'api/auth/email-verification', {
    params: {verifytoken: token, email: email}
  });

}

// ------------------Forgot Password-----------
  // send email to user with token
  sendEmailForReset(model) {
    return this.http.post<any>(environment.apiUrl  + 'api/auth/reset-request', model);
  }

  // token validity after email sent
  checkTokenValidity(token) {
    return this.http.get<any>(environment.apiUrl  + 'api/auth/resetpassword/' + token);
  }

  resetPassword(model) {
    return this.http.post<any>(environment.apiUrl  + 'api/auth/resetpassword', model);
  }


  // change Password

  changePassword(model) {
    model.userId = this.decodedtoken.Id;
    return this.http.post<any>(environment.apiUrl  + 'api/auth/changepassword', model);
  }


  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }


  public get getUserId(): boolean {
    return (this.decodedtoken.Id);
  }
  // get role

  public get isAdmin(): boolean {
    return (this.decodedtoken.isAdmin);
  }
}
