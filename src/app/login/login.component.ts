import { Component, OnInit, Directive, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './auth.service';
import { TokenStorageService } from './token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../shared/notification.service';
import { SideNavService } from '../shared/side-nav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = true;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthenticationService,private router : Router ,
              private sideNavService: SideNavService,
              private notificationService:NotificationService,
              private tokenStorage: TokenStorageService, ) { }

  ngOnInit() {

    if (this.tokenStorage.getToken()) {
        this.isLoggedIn = true;
     //  this.role = this.tokenStorage.getRole();
    //  console.log("onInit", this.role);
    }

  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
      //  console.log(data);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.username);
        this.tokenStorage.saveRole(data.role[0].name);
        let privilegeData = data.role[0].privileges;
        this.tokenStorage.savePrivilege(privilegeData);
        this.isLoginFailed = false;
       // this.navigateByReloadingPage();
        this.notificationService.success(" : : Connexion avec succes ");
        this.sideNavService.logintriggerBSubject.subscribe(val =>{ val = this.isLoggedIn;});
      });
  }

  navigateByReloadingPage(){
    this.router.navigate(['/demandeurs']).then(() => {
    window.location.reload();
  });
  }

}


