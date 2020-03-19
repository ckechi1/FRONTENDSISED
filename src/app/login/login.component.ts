import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './auth.service';
import { TokenStorageService } from './token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthenticationService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
     // console.log(this.tokenStorage.getToken);
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser();
      //console.log(this.roles);
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.role);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().role;
        console.log(this.roles);
       this.reloadPage();
      },
      (err) => {
        console.log(err);
        this.isLoginFailed = false;
      });
  }

  reloadPage() {
    window.location.reload();
  }
}
