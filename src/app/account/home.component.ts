import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isLoggedIn$: Observable<boolean>;


  constructor(public authService: AuthService) {
    this.authService.title = 'Home';
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
  }

  ngOnInit() {
  }

}
