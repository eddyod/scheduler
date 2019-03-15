import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { AuthService } from './auth.service';



@Injectable()


export class InterceptService implements HttpInterceptor {

  constructor(private alertService: AlertService, private authService: AuthService) { }

  // intercept request and add token
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // modify request

    if (new RegExp('users/\\d+/sites|users/register|/login').test(request.url)) {
      console.log('matched');
    } else {
      request = request.clone({ setHeaders: { Authorization: `JWT ${sessionStorage.getItem('token')}` } });
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) { }
      }, error => {
        // http response status code
        this.alertService.error(error.message);
        if (error.status === 401) {
          this.authService.logout();
          this.alertService.error('Your session has expired.');
        }

      })
    );
  }
}
