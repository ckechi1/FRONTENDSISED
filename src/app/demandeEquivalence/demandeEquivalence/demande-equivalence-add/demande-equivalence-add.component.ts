import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyApiService } from 'src/app/my-api.service';
import { DemandeEquivalence }from '../../demandeEquivalence';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-demande-equivalence-add',
  templateUrl: './demande-equivalence-add.component.html',
  styleUrls: ['./demande-equivalence-add.component.css']
})
export class DemandeEquivalenceAddComponent {

  demandeEquivalence : any;
  public demandeurId : number;

  form :FormGroup;
  id:number=null;
  dateDepot ='';
  numeroRecepisse:number=null;
  numeroBordereau:number=null;
  diplomeAnterieur='';
  diplomeDemande='';
  isloadingResults=false;

constructor(private router: Router, private route: ActivatedRoute,
            private api: MyApiService,private fb: FormBuilder,
            private dialogRef: MatDialogRef<DemandeEquivalenceAddComponent>,
           @Inject(MAT_DIALOG_DATA) data){

            this.id=data.id; // assign formation.id from dialog.id  to formation id
            this.demandeurId = data.demandeurId;
            //  console.log(`demandeurId=${this.demandeurId} , FormationId=${this.id}`);
            this.form = fb.group({
            dateDepot: [new Date(data.dateDepot), Validators.required],
            numeroRecepisse: [data.numeroRecepisse, Validators.required],
            numeroBordereau: [data.numeroBordereau, Validators.required],
            diplomeAnterieur: [data.diplomeAnterieur, Validators.required],
            diplomeDemande: [data.diplomeDemande, Validators.required],
});

}

  // onSubmit() {
  //  alert('Thanks!');
  // }

  ngOnInit() {

  }

onformSubmit(form:NgForm){
  this.isloadingResults = true;
    // check if the formation id is available and add form jump to update if present
    if (this.id == null || undefined ){
        this.api.addDemandeEquivalence(this.demandeurId,form)
        .subscribe(
          res=> {
            this.isloadingResults=false;
          },(err) => {
            console.log(err);
            this.isloadingResults=false;
          },
        )
    } else {
      this.api.updateDemandeEquivalence(this.demandeurId, this.id,form)
      .subscribe(res => {
       this.isloadingResults = false;
       }, (err) => {
        console.log(err);
         this.isloadingResults = false;
    })
  }
 }

 save() {
  this.dialogRef.close(this.onformSubmit(this.form.value));
}

close() {

  this.dialogRef.close();
}

}
