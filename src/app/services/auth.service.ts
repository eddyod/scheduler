import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { AlertService } from '../services/alert.service';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Site } from '../models/site';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sessionActive = new BehaviorSubject<boolean>(this.tokenAvailable());
  // the email of the logged in user
  public user: User = new User();
  // error messages received from the login attempt
  public errors: any = [];
  // title in panel headers
  public title = 'Employee Time Scheduler';
  // the token expiration date
  public token_expires: Date;
  private token: string;
  // url for rest data
  API_URL = environment.apiEndpoint;

  constructor(private alertService: AlertService,
    private http: HttpClient,
    private router: Router) { }

  public login(email: string, password: string) {
    return this.http.post<any>(this.API_URL + '/login', { email: email, password: password }, httpOptions)
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data && data['token']) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.token = data['token'];
          this.sessionActive.next(true);
          this.updateData(this.token);
          this.getAndSetSite();
        } else {
          console.log("No data returned from login.")
        }
        return data;
      }));
  }


  private getAndSetSite() {
    this.http.get<User>(this.API_URL + '/users/currentuser')
      .subscribe(data => {
        this.user = data;
        if (this.user.site) {
          sessionStorage.setItem('user', JSON.stringify(data));
        } else {
          this.user = null;
          this.alertService.error('Your are not associated with any business.');
        }
      },
        err => {
          this.errors = err['error'];
        }
      );
  }

  public logout() {
    this.sessionActive.next(false);
    this.token_expires = null;
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this.router.navigate(['/account/login']);
  }

  public getExpiration() {
    return moment(this.token_expires);
  }

  public get isTokenActive() {
    return moment().isBefore(this.getExpiration());
  }

  private updateData(token) {
    this.token = token;
    this.errors = [];
    // decode the token to read the email and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    sessionStorage.setItem('token', token);
  }

  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.token = sessionStorage.getItem('token');
    this.http.post(this.API_URL + '/api-token-refresh/', JSON.stringify({ token: this.token }), httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  public register(user) {
    return this.http.post(this.API_URL + '/users/register', JSON.stringify(user), httpOptions);
  }

  public registerSite(site: Site) {
    return this.http.post(this.API_URL + '/sites', site);
  }

  private tokenAvailable(): boolean {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    return !!sessionStorage.getItem('token');
  }

  public get isLoggedIn() {
    return this.sessionActive.asObservable(); // {2}
  }

}
