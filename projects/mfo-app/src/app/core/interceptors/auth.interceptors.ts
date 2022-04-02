import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,private toastr: ToastrService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('token');
    req = req.clone({
      setHeaders: {
        'Accept-Language': 'ru',
      },
    });
    if (accessToken) {
      // console.log(req)
      req = req.clone({
        setHeaders: {
          'Authorization': `${accessToken}`,
        },
      });
    }
    return next.handle(req).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.toastr.error(err.error?.message, 'Ошибка!');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigate(['/profile/login']);
          return;
        }

        if(err.error?.message){
          if (err.error?.message.includes("[") & err.error?.message.includes("]")) {
            var index1 = err.error.message.indexOf( "[" );
            var index2 = err.error.message.indexOf( "]" );
            let errorMessage = err.error.message.substring(index1+1, index2)
            this.toastr.error(errorMessage);
          } else {
            this.toastr.error(err.error?.message, 'Ошибка!');
          }
          return;
        }
      }
    }));
  }
}
