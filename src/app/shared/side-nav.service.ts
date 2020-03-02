import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  public sidenavToggleBsubject : BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  public toggle(){
    this.sidenavToggleBsubject.next(null);
  }
}

