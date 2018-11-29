import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;                  // {1}

  constructor(
    public authService: AuthService,
    private alertService: AlertService
  ) {
    this.authService.title = 'Account Information';
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
  }

  ngOnInit() {
    // console.log(sessionStorage.getItem('username'));
  }

  refreshToken() {
    this.authService.refreshToken();
  }

  logout() {
    this.authService.logout();
    this.alertService.success('You have successfully logged out.');
  }

}