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


@Injectable()

export class InterceptService implements HttpInterceptor {

  constructor() { }

  // intercept request and add token
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // modify request
    request = request.clone({
      setHeaders: {
        Authorization: `JWT ${localStorage.getItem('Token')}`
      }
    });

    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {}
        }, error => {
          // http response status code
          console.error('Error status code:');
          console.error(error.status);
          console.error(error.message);
          console.log('--- end of response---');

        })
      );
  }


}
