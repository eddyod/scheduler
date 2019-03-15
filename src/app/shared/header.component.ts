import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    // this.isLoggedIn$ = this.authService.isLoggedInX; 
  }

  logout() {
    this.authService.logout();                      // {3}
  }
}
