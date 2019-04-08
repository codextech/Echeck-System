import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './_services/user-auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

jwtHelper: JwtHelperService = new JwtHelperService();
  title = 'Echeck-App';

constructor(private authService: UserAuthService) {}
  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    this.authService.decodedtoken = this.jwtHelper.decodeToken(token);
  }





}
