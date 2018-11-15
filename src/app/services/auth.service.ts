import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public loginXXX(user) {
    return this.http.post(this.API_URL + '/api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
        console.log(data);
        this.updateData(data['token']);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.getAndSetSite(data['userid']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.API_URL + '/api-token-auth/', { username: username, password: password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  private getAndSetSite(auth_id: string) {
    const params = new HttpParams()
      .set('auth_id', auth_id)
    this.http.get(this.API_URL + '/user_site', { params })
      .subscribe(data => {
        console.log(data[0]['site_id']);
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
    this.token = null;
    this.token_expires = null;
    this.username = null;
    localStorage.removeItem('site_id');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('currentUser');
  }

  public isLoggedIn() {
    return moment().isBefore(this.token_expires);
    // return this.isLoggedIn;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
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
    console.log('first name is ');
    console.log(token_decoded.first_name);
    localStorage.setItem('id_token', token.idToken);
    localStorage.setItem('Token', token);
    localStorage.setItem('user_id', token_decoded.user_id);
    localStorage.setItem('first_name', token_decoded.first_name);
  }

  register(user: User) {
    console.log(this.API_URL + '/api/users');
    return this.http.post(this.API_URL + '/api/users', user);
  }


}
