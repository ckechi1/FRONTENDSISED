import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const PIVILEGE_KEY ='auth-privilege';
const ROLE_KEY ='auth-role';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);

  }

  public saveUser(user:any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  saveRole(role: any) {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY , JSON.stringify(role));
  }

  public savePrivilege(authority:any){
     window.sessionStorage.removeItem(PIVILEGE_KEY);
     window.sessionStorage.setItem(PIVILEGE_KEY , JSON.stringify(authority));
  }

  public getUser(){
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public getPrivilege(){
    return JSON.parse(sessionStorage.getItem(PIVILEGE_KEY));
  }

  getRole(): any {
    return JSON.parse(sessionStorage.getItem(ROLE_KEY));
  }
}
