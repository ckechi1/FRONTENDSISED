import { Component, OnInit, Directive, AfterViewInit, OnDestroy } from '@angular/core';
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

  constructor(private authService: AuthenticationService,private router : Router ,
              private tokenStorage: TokenStorageService, ) { }

  ngOnInit() {
    document.querySelector('body').classList.add('blue');
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
        this.tokenStorage.saveUser(data.username);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = data.role;
        console.log(this.roles);
        this.navigateByReloadingPage();
      },
      (err) => {
        console.log(err);
        this.isLoginFailed = false;
      });
  }


  navigateByReloadingPage(){
    this.router.navigate(['/demandeurs']).then(() => {
    window.location.reload();
  });
  }
//   reloadCurrentRoute() {
//     let currentUrl = this.router.url;
//     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
//     this.router.navigate([currentUrl]);
//     });
// }

}

@Directive({ selector: '[BlueDirective]' })
export class BlueDirective implements OnDestroy, AfterViewInit {

  ngAfterViewInit() {
    document.querySelector('body').classList.add('blue');

  }
  ngOnDestroy(): void {
    document.querySelector('body').classList.remove('blue');
  }
}
