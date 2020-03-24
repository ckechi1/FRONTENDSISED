import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';
import { TokenStorageService} from './token-storage.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private token: TokenStorageService , private router : Router) { }

   intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
    //  console.log(token);
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  };
}

