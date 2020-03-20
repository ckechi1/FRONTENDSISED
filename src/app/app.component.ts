import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../app/shared/side-nav.service';
import { TokenStorageService } from './login/token-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title : " SISED" ;
    isloggedin:boolean ;
    token: string;

    ngOnInit() {

   this.isloggedin=this.islogin();

  }

  constructor( private router : Router , private sidenavService : SideNavService ,
               private tokenStorage:TokenStorageService){}

  public clickMenu(){
    this.sidenavService.toggle();
  }

  public logOut(){
  this.tokenStorage.signOut();
  this.navigateByReloadingPage();
  }

  public islogin(islogin=false) : boolean {
    if (this.tokenStorage.getToken() != null ){ // if the token has some value
       islogin = true; //  display disconnect button
       this.sidenavService.logintriggerBSubject.next(islogin); // send the result

      }
        return islogin;
   }

   navigateByReloadingPage(){
    this.router.navigate(['/login']).then(() => {
    window.location.reload();
  });
  }
}

