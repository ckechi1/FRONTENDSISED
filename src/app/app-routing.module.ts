import { DemandeursComponent } from './demandeur/demandeurs/demandeurs.component';
import { DemandeurDetailComponent } from './demandeur/demandeur-detail/demandeur-detail.component';
import { DemandeurAddComponent } from './demandeur/demandeur-add/demandeur-add.component';
import { DemandeurEditComponent } from './demandeur/demandeur-edit/demandeur-edit.component'; 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {SidenavComponent} from './sidenav/sidenav.component';
const routes: Routes = [  
  
  {path: 'login', component: LoginComponent},
 // {path: '', component: LoginComponent},
//  {path: 'logout', component: LoginComponent}, 
  {path: 'logout', component: LogoutComponent},   

/*
  { path: '', component: LoginComponent },
  { path: '', children: [
    { path: 'demandeurs', component: DemandeursComponent }
  ] },  

*/ 
   {path:'demandeurs',
   component:DemandeursComponent,
   data:{title:'List of demandeurs'}
   },
  
   {
   path:'demandeur-detail/:id',
   component:DemandeurDetailComponent,
   data:{title:'demandeur detail'}
   },  
 
   {
   path:'demandeur-add',
   component:DemandeurAddComponent,
   data:{ title:'Add demandeur'}
   }, 
    
   
   {
   path:'demandeur-edit/:id',
   component:DemandeurEditComponent,
   data: {title:'Edit demandeur'}
   },


   {
     path:'',
     redirectTo:'/demandeurs',
     pathMatch:'full'
   } 
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
