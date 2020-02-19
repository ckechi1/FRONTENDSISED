import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms'; 
import { MyApiService } from '../../my-api.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { Demandeur } from '../demandeur';

///////////////////////////////////////////////*******************///////////////////////////////////////////////// 
/** erreur handler when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   } 
// ///////////////////////////////////////////////*******************/////////////////////////////////////////////////
// }
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
  //matcher = new MyErrorStateMatcher(); 
    
  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formulaireDemandeur.get('formArray'); }  
  
  constructor(private router: Router, private api: MyApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {  
  
  this.formulaireDemandeur = this.formBuilder.group({ 
    formArray:this.formBuilder.array([ 
    this.formBuilder.group({   
    'nom' : [null, Validators.required],
    'prenom' : [null, Validators.required],
    'genre': [null, Validators.required],  
    'status': [null, Validators.required],   
    'nationalite': [null, Validators.required],  
    'numeroPieceDidentite': [null, Validators.required],
    }), 
    this.formBuilder.group({ 
      'dateNaissance': [null, Validators.required], 
      'lieuNaissance': [null, Validators.required], 
      'adresse': [null, Validators.required], 
      'telephone': [null, Validators.required], 
      'email': [null, Validators.required],   
    }),
    ])  
  }); 

} 

  surFormValider(form:NgForm) {
  this.isloadingResults = true;
  this.api.addDemandeur(form)
    .subscribe(res => {
        let id = res['id'];
        this.isloadingResults = false;
        this.router.navigate(['/demandeur-detail', id]);
      }, (err) => {
        console.log(err);
        this.isloadingResults = false;
      });
}

}
