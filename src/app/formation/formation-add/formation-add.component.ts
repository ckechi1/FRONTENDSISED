import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MyApiService } from '../../my-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { DemandeurDetailComponent} from '../../demandeur/demandeur-detail/demandeur-detail.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
///////////////////////////////////////////////*******************/////////////////////////////////////////////////
}
@Component({
  selector: 'app-formation-add',
 // templateUrl: './formation-add.component.html',
  templateUrl: './../../demandeur/demandeur-add/demandeur-add.component.html',
  styleUrls: ['./formation-add.component.css']
})

export class FormationAddComponent implements OnInit {


  demandeurIdInfo : DemandeurDetailComponent;

  formationFormulaire : FormGroup ;
  nom:'';
  pays:'';
  specialite:'';
  dateObtention:'';
  Etablissement:'';
  isloadingResults=false;
  matcher = new MyErrorStateMatcher();

  constructor(private route:ActivatedRoute , private router: Router, private api: MyApiService, private formBuilder: FormBuilder) {
      this.demandeurIdInfo = new DemandeurDetailComponent( route , api , router);
   }


  ngOnInit() {


   this.demandeurIdInfo.getDemandeurDetails();

    this.formationFormulaire = this.formBuilder.group({
      'nom' : [null, Validators.required],
      'pays' : [null, Validators.required],
      'specialite': [null, Validators.required],
      'dateObtention': [null, Validators.required],
      'Etablissement': [null, Validators.required],
    });
  }

  surFormValider2(id){
    this.isloadingResults=true;
    this.api.addFormation(id , this.formationFormulaire.value)
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
