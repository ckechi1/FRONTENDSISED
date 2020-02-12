import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'; 
import { MyApiService } from '../../my-api.service';
import { Demandeur} from '../demandeur'; 
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

///////////////////////////////////////////////*******************///////////////////////////////////////////////// 
/** erreur handler when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  } 
///////////////////////////////////////////////*******************/////////////////////////////////////////////////
}
@Component({
  selector: 'app-demandeur-add',
  templateUrl: './demandeur-add.component.html',
  styleUrls: ['./demandeur-add.component.css']
})
export class DemandeurAddComponent implements OnInit { 
  
  formulaireDemandeur :FormGroup; 
  nom =''; 
  prenom=''; 
  genre=''; 
  nationalite=''; 
  dateNaissance=''; 
  lieuNaissance=''; 
  adresse=''; 
  telephone:number=null; 
  email=''; 
  status=''; 
  numeroPieceDidentite:number=null;
  isloadingResults=false;  
  matcher = new MyErrorStateMatcher(); 
   
  constructor(private router: Router, private api: MyApiService, private formBuilder: FormBuilder) { }

  ngOnInit() { 
  this.formulaireDemandeur = this.formBuilder.group({
    'nom' : [null, Validators.required],
    'prenom' : [null, Validators.required],
    'genre': [null, Validators.required],  
    'nationalite': [null, Validators.required], 
    'dateNaissance': [null, Validators.required], 
    'lieuNaissance': [null, Validators.required], 
    'adresse': [null, Validators.required], 
    'telephone': [null, Validators.required], 
    'email': [null, Validators.required], 
    'status': [null, Validators.required],  
    'numeroPieceDidentite': [null, Validators.required], 
  });
}
 surFormValider(){ 
    this.isloadingResults=true; 
    this.api.addDemandeur(this.formulaireDemandeur.value) 
    .subscribe((res:any)=>{ 
      const id = res.id; 
      this.isloadingResults=false; 
      this.router.navigate(['/demandeur-detail',id]); 
    },(err:any)=>{   
      console.log(err); 
      this.isloadingResults=false;
    });
 }
}
