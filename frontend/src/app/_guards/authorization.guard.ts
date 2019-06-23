import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';

@Injectable()
export class AuthorizationGuard implements CanActivateChild {
  constructor(private router: Router, private authService: UserAuthService) { }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAdmin) {
      return true;
    }

    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
