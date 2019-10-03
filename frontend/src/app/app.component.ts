import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './_services/user-auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { fadeAnimation } from './fade.animation';
declare var $;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {

jwtHelper: JwtHelperService = new JwtHelperService();
  title = 'Echeck-App';




constructor(private authService: UserAuthService, private router: Router) {}
  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    this.authService.decodedtoken = this.jwtHelper.decodeToken(token);


    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });

  $('.toltip').tooltip('show');
  }




}
