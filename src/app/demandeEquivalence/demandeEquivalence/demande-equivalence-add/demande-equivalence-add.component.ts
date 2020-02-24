import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyApiService } from 'src/app/my-api.service';
import { DemandeEquivalence }from '../../demandeEquivalence';
@Component({
  selector: 'app-demande-equivalence-add',
  templateUrl: './demande-equivalence-add.component.html',
  styleUrls: ['./demande-equivalence-add.component.css']
})
export class DemandeEquivalenceAddComponent {

  formulaireEquivalenceDemande :FormGroup;
  dateDepot ='';
  numeroRecepisse:number=null;
  numeroBordereau:number=null;
  diplomeAnterieur='';
  diplomeDemande='';
  isloadingResults=false;

constructor(private route: ActivatedRoute,private router: Router, private api: MyApiService, private formBuilder: FormBuilder) { }

  onSubmit() {
  //  alert('Thanks!');
  }

  ngOnInit() {
     this.id = this.route.snapshot.paramMap.get('id');
    this.formulaireEquivalenceDemande = this.formBuilder.group({
    dateDepot: [null, Validators.required],
    numeroRecepisse: [null, Validators.required],
    numeroBordereau: [null, Validators.required],
    diplomeAnterieur: [null, Validators.required],
    diplomeDemande: [null, Validators.required],
  });

  }


  surFormValider(id:number) {
    this.isloadingResults = true;
    console.log(`id du demandeur est ${this.id}`)
    this.api.addDemandeEquivalence(this.id , this.formulaireEquivalenceDemande.value)
      .subscribe(res => {
          const id = res.id;
          console.log(`id in add is ${id}`);
          this.isloadingResults = false;
        }, (err) => {
          console.log(err);
          this.isloadingResults = false;
        });
  }

}
