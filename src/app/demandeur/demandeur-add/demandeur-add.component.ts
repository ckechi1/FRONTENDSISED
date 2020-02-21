import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { MyApiService } from '../../my-api.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute,private router: Router, private api: MyApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {

  this.formulaireDemandeur = this.formBuilder.group({
     id: [],
    'nom' : [null, Validators.required],
    'prenom' : [null, Validators.required],
    'genre': [null, Validators.required],
    'status': [null, Validators.required],
    'nationalite': [null, Validators.required],
    'numeroPieceDidentite': [null, Validators.required],
      'dateNaissance': [null, Validators.required],
      'lieuNaissance': [null, Validators.required],
      'adresse': [null, Validators.required],
      'telephone': [null, Validators.required],
      'email': [null, Validators.required],
  });

}

  surFormValider() {
  this.isloadingResults = true;
  this.api.addDemandeur(this.formulaireDemandeur.value)
    .subscribe(res => {
        const id = res.id;
        console.log(`id in add is ${id}`);
        this.isloadingResults = false;
       // this.router.navigate(['/demandeur-detail', this.id]);
       this.router.navigate(['/demandeurs']);
      }, (err) => {
        console.log(err);
        this.isloadingResults = false;
      });
}

}
