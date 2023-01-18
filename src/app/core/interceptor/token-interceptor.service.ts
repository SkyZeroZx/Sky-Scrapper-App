import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes('auth/login') || !req.url.includes('auth/sign-in')) {
      const token = localStorage.getItem('token') || '';
      if (token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token,
          },
        });
        return next.handle(authReq).pipe(finalize(() => {}));
      }
    }
    return next.handle(req).pipe(finalize(() => {}));
  }
}
