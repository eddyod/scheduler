import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());
  // http options used for making API calls
  private httpOptions: any;

  // the actual JWT token
  public token: string;

  // the token expiration date
  public token_expires: Date;

  // the username of the logged in user
  public username: string;

  // error messages received from the login attempt
  public errors: any = [];
  // var to show is logged interface
  // public isLoggedIn: boolean;

  API_URL = environment.apiEndpoint;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  public login(username: string, password: string) {
    return this.http.post<any>(this.API_URL + '/api-token-auth/', { username: username, password: password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user['token']) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.updateData(user['token']);
          this.getAndSetSite()
          this.loggedIn.next(true);
        }
        return user;
      }));
  }

  private getAndSetSite() {
    this.http.get(this.API_URL + '/currentuser')
      .subscribe((user: User) => {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
      },
        err => {
          this.errors = err['error'];
        }
      );

  }

  private getAndSetSiteXXX(auth_id: string) {
    const params = new HttpParams()
      .set('auth_id', auth_id)
    this.http.get(this.API_URL + '/user_site', { params })
      .subscribe(data => {
        localStorage.setItem('site_id', data[0]['site_id']);
      },
        err => {
          this.errors = err['error'];
        }
      );
  }

  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.http.post(this.API_URL + '/api-token-refresh/', JSON.stringify({ token: this.token }), this.httpOptions).subscribe(
      data => {
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  public logout() {
    this.loggedIn.next(false);
    this.token = null;
    this.token_expires = null;
    localStorage.removeItem('user');
    localStorage.removeItem('expires_at');
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  getExpiration() {
    return moment(this.token_expires);
  }

  private updateData(token) {
    this.token = token;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
    localStorage.setItem('token', token);
    localStorage.setItem('username', this.username);
    localStorage.setItem('user_id', token_decoded.user_id);
  }

  private tokenAvailable(): boolean {
    this.username = localStorage.getItem('username');
    return !!localStorage.getItem('token');
  }

  register(user: User) {
    return this.http.post(this.API_URL + '/api/users', user);
  }


}
