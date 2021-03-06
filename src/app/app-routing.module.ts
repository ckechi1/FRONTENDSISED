import { DemandeursComponent } from './demandeur/demandeurs/demandeurs.component';
import { DemandeurDetailComponent } from './demandeur/demandeur-detail/demandeur-detail.component';
import { DemandeurAddComponent } from './demandeur/demandeur-add/demandeur-add.component';
import { DemandeurEditComponent } from './demandeur/demandeur-edit/demandeur-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './Register/logout.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FormationAddComponent } from './formation/formation-add/formation-add.component';
import { DemandeEquivalenceComponent } from './demandeEquivalence/demandeEquivalence/demande-equivalence/demande-equivalence.component'
import { DemandeEquivalenceAddComponent } from './demandeEquivalence/demandeEquivalence/demande-equivalence-add/demande-equivalence-add.component';
import { FormationEditComponent } from './formation/formation-edit/formation-edit.component';
import { DemandeurFormationComponent } from './demandeurFormation/demandeur-formation/demandeur-formation.component';
import { DemandeurFormationEditComponent } from './demandeurFormation/demandeur-formation-edit/demandeur-formation-edit.component';
const routes: Routes = [


  { path: 'login', component: LoginComponent ,data:{ title:'login'}},
  { path: '',
  children: [
      /* --- Demandeurs routers ---  */
   {path:'demandeur-add',component:DemandeurAddComponent,data:{ title:'Add demandeur'}},
   {path:'demandeurs',component:DemandeursComponent,data:{title:'List of demandeurs'}},
   {path:'demandeur-detail/:id',component:DemandeurDetailComponent,data:{title:'demandeur detail'}},
   {path:'demandeur-edit/:id',component:DemandeurEditComponent,data: {title:'Edit demandeur'}},
   /* --- formation routers --- */
   {path :'demandeur-add/:id/:id ', component:FormationEditComponent , data:{title:'Edit formation '}},
   {path :'formation-add', component:FormationAddComponent , data:{title:'Add formation '}},
   /* --- Demandeurformation Association routers --- */
   {path :'DemandeurFormation',component:DemandeurFormationComponent,data:{title:'List of DemandeurFormation'}},
   {path :'DemandeurFormation-Edit',component:DemandeurFormationEditComponent,data:{title:'add edit DemandeurFormationAddEdit'}},
   /* --- Demande equivalence routers --- */
   {path :'demandeEquivalence',component:DemandeEquivalenceComponent,data:{title:'List of demandeEquivalence'}},
   {path :'demandeEquivalence-add',component:DemandeEquivalenceAddComponent,data:{title:'add demandeEquivalence'}},
   /* --- default route --- */
   {path:'',redirectTo:'/login',pathMatch:'full'}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
