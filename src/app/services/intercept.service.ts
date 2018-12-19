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



@Injectable()


export class InterceptService implements HttpInterceptor {

  constructor(private alertService: AlertService) { }

  // intercept request and add token
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // modify request

    if (new RegExp('users/\\d+/sites|users/register|/login').test(request.url)) {
      console.log('matched');
      // const tokenInHeader = request.clone({ setHeaders: { 'version': '1LF' } });
      // return next.handle(request);
      // request = request.clone({ setHeaders: { 'Content-Type': 'application/json' } });
    } else {
      request = request.clone({ setHeaders: { Authorization: `JWT ${sessionStorage.getItem('token')}` } });
    }

    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) { }
        }, error => {
          // http response status code
          this.alertService.error(error.message);

          // console.error(error.status);
          // console.error(error.message);

        })
      );
  }
}
