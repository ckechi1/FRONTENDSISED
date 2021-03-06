import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { publishBehavior } from 'rxjs/operators';
import { TokenStorageService } from '../login/token-storage.service';
@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  token:string;
  islvalid:boolean;
  public sidenavToggleBsubject : BehaviorSubject<any> = new BehaviorSubject(null);
  public logintriggerBSubject : BehaviorSubject<Boolean> = new BehaviorSubject<boolean>(false);

  constructor(private tokenStorage: TokenStorageService) { }

  public toggle(){
    this.sidenavToggleBsubject.next(null);
  }

  public sendData(){
     this.logintriggerBSubject.next(this.islvalid);
     console.log("sendata" , this.islvalid);
  }
}

