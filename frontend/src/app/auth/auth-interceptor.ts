import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable, of } from 'rxjs';


  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router,
                private toastr: ToastrService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
      const authToken = localStorage.getItem('access_token');
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
      });

      return next.handle(authRequest)
      .pipe(
        catchError((err, caught: Observable<HttpEvent<any>>) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.router.navigate(['login']);
            this.toastr.error('Session Expired');
            return of(err as any);
          }
          throw err;
        })
      );


    }
  }
