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

    const regex = '/account/business';
    // modify request

    if (request.url.search(regex) === -1) {
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
