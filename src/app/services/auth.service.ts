import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { Site } from '../models/site';
import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());

  // the actual JWT token
  public token: string;

  // the token expiration date
  public token_expires: Date;

  // the username of the logged in user
  public username: string;
  public user: User = new User();

  // error messages received from the login attempt
  public errors: any = [];
  // title in panel headers
  public title = 'Employee Time Scheduler';


  API_URL = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {
    return this.http.post<any>(this.API_URL + '/login', { username: username, password: password }, httpOptions)
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data && data['token']) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.updateData(data['token']);
          this.loggedIn.next(true);
        } else {
          console.log("No data returned from login.")
        }
        return data;
      }));
  }

  private updateData(token) {
    this.token = token;
    this.errors = [];
    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', this.username);
    this.getAndSetSite();
  }


    private getAndSetSite() {
      this.http.get<User>(this.API_URL + '/users/currentuser')
        .subscribe(data => {
          this.user = data;
          sessionStorage.setItem('user', JSON.stringify(data));
        },
          err => {
            this.errors = err['error'];
          }
        );

    }

  // Refreshes the JWT token, to extend the time the user is logged in
  public refreshToken() {
    this.http.post(this.API_URL + '/api-token-refresh/', JSON.stringify({ token: this.token }), httpOptions).subscribe(
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
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('expires_at');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  public getExpiration() {
    return moment(this.token_expires);
  }

  private tokenAvailable(): boolean {
    this.username = sessionStorage.getItem('username');
    this.user = JSON.parse(sessionStorage.getItem('user'));
    return !!sessionStorage.getItem('token');
  }

  public register(user) {
    return this.http.post(this.API_URL + '/users/register', JSON.stringify(user), httpOptions);
  }

  public registerSite(site: Site) {
    return this.http.post(this.API_URL + '/sites', site);
  }

}
