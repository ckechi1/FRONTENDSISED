import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

  const AUTH_API = "/SISED/sign-in" ;
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

 constructor(private http: HttpClient) { }

  login(credentials:any): Observable<any> {
    return this.http.post(AUTH_API, {
      username: credentials.username,
      password: credentials.password}
      ,httpOptions);
  }

}
