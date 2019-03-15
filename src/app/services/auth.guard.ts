import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/user';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private user: User = new User();

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (sessionStorage.getItem('user')) {
      this.authService.user = this.user;
      this.setExpiration();
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  private setExpiration() {
    let token = sessionStorage.getItem('token');
    const token_parts = token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    const token_expires = new Date(token_decoded.exp * 1000);
    this.authService.token_expires = token_expires;
  }



}
