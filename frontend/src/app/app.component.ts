import { Component, OnInit, OnDestroy, HostListener, AfterViewInit, AfterViewChecked  } from '@angular/core';
import {Location} from '@angular/common';
import { UserAuthService } from './_services/user-auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { fadeAnimation } from './fade.animation';
import { SubscriptionLike } from 'rxjs';

declare var $;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})


export class AppComponent implements OnInit, OnDestroy, AfterViewChecked  {


  public subscription: SubscriptionLike;
jwtHelper: JwtHelperService = new JwtHelperService();




constructor(private authService: UserAuthService, private location: Location,
  private router: Router ) {

    // this.handleBackButtonPress();
  //  this.location.subscribe(() => {
  //     // alert(window.location);
  //     // this.router.navigate([window.location]);
  //     this.location.back();
  //   });

  }
  ngOnInit(): void {


    const token = localStorage.getItem('access_token');
    this.authService.decodedtoken = this.jwtHelper.decodeToken(token);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return
      }
      window.scrollTo(0, 0);
  });


  }



  ngAfterViewChecked(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleBackButtonPress() {
    this.subscription = this.location.subscribe(redirect => {
     /*  if (redirect.pop === true) {
        alert('this is a backbutton click');
      } */
      debugger

      if (window.history.length > 1) {
        this.router.navigate(['error-505']);
        // window.location.href = redirect.url;
      } else {
        this.router.navigate(['/']);
      }

    });
  }


 public onClickImageViewerClose() {
      $("#imgBig").attr("src", "");
      $("#overlay").hide();
      $("#overlayContent").hide();
  }

}
