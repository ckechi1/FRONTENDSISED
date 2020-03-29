import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../app/shared/side-nav.service';
import { TokenStorageService } from './login/token-storage.service';
import { Router } from '@angular/router';
import { NgxRolesService, NgxPermissionsService } from 'ngx-permissions';
import { observeOn } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title : " SISED" ;
    isloggedin:any ;
    token: string;
    user:string;
    roleName : string;
    privilege: string[] = [];
    list : Array<any> ;


  ngOnInit() {

    //     this.sidenavService.logintriggerBSubject.subscribe(()=>{
          this.isloggedin=this.islogin();
    //     console.log(this.isloggedin);
    // });

   this.getUserDetail();
   this.chargerRoleUtilisateur();
   console.log(this.ngxRoleService.getRoles());

  }

  constructor( private router : Router , private sidenavService : SideNavService ,
               private ngxRoleService: NgxRolesService,
               private ngxPermission : NgxPermissionsService,
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


 getUserDetail(){
   this.user = this.tokenStorage.getUser();
   this.roleName = this.tokenStorage.getRole();
   this.list = this.tokenStorage.getPrivilege();
   if (this.list == null){
   } else{
      this.list.forEach(value =>{
     this.privilege.push(value.authority);
  })
   }

}

   chargerRoleUtilisateur(){

   this.ngxPermission.addPermission(this.privilege);
   this.ngxRoleService.addRole(this.roleName, this.privilege);

   }

  //  chargerUtilisateur(){
  //  this.ngxPermission.loadPermissions([this.roleName]);
  //  }

}

