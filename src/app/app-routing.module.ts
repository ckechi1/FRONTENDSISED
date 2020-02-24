import { DemandeursComponent } from './demandeur/demandeurs/demandeurs.component';
import { DemandeurDetailComponent } from './demandeur/demandeur-detail/demandeur-detail.component';
import { DemandeurAddComponent } from './demandeur/demandeur-add/demandeur-add.component';
import { DemandeurEditComponent } from './demandeur/demandeur-edit/demandeur-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FormationAddComponent } from './formation/formation-add/formation-add.component';
import { FormationComponent } from './formation/formation/formation/formation.component';
import { DemandeEquivalenceComponent } from './demandeEquivalence/demandeEquivalence/demande-equivalence/demande-equivalence.component'
import { DemandeEquivalenceAddComponent } from './demandeEquivalence/demandeEquivalence/demande-equivalence-add/demande-equivalence-add.component';
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
      /* --- Demandeurs routers ---  */

   {path:'demandeur-add',component:DemandeurAddComponent,data:{ title:'Add demandeur'}},

   {path:'demandeurs',component:DemandeursComponent,data:{title:'List of demandeurs'}},

   {path:'demandeur-detail/:id',component:DemandeurDetailComponent,data:{title:'demandeur detail'}},

   {path:'demandeur-edit/:id',component:DemandeurEditComponent,data: {title:'Edit demandeur'}},

    /* --- formation routers --- */

   {path :'formation-add ', component:FormationAddComponent , data:{title:'Add formation '}},
   {path :'formation',component:FormationComponent,data:{title:'List of formations'}},

    /* --- Demande equivalence routers --- */

    {path :'demandeEquivalence',component:DemandeEquivalenceComponent,data:{title:'List of demandeEquivalence'}},
    {path :'demandeEquivalence-add',component:DemandeEquivalenceAddComponent,data:{title:'List of demandeEquivalence'}},


   /* --- default route --- */
   {path:'',redirectTo:'/demandeurs',pathMatch:'full'}



 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
