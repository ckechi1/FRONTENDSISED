import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MyApiService } from 'src/app/my-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-demandeur-formation-add-edit',
  templateUrl: './demandeur-formation-add-edit.component.html',
  styleUrls: ['./demandeur-formation-add-edit.component.css']
})
export class DemandeurFormationAddEditComponent implements OnInit {

  demandeEquivalence : any;
  public demandeurId : number;
  public formationId : number;

  form :FormGroup;
  id:number=null;
  nomFormation:string='';
  mention:string='';
  promotion:string='';
  pays:string='';
  dateObtention:Date=null;
  etablissement:string='';
  isloadingResults=false;

constructor(private router: Router, private route: ActivatedRoute,
            private api: MyApiService,private fb: FormBuilder,
            private dialogRef: MatDialogRef<DemandeurFormationAddEditComponent>,
           @Inject(MAT_DIALOG_DATA) data){

            this.id=data.id; // assign formation.id from dialog.id  to formation id
            this.demandeurId = data.demandeurId;
            //  console.log(`demandeurId=${this.demandeurId} , FormationId=${this.id}`);
            this.form = fb.group({
            dateObtention: [new Date(data.dateObtention), Validators.required],
            mention: [data.mention, Validators.required],
            promotion: [data.promotion, Validators.required],
            pays: [data.pays, Validators.required],
            nomFormation: [data.nomFormation, Validators.required],
            etablissement: [data.etablissement, Validators.required],

  });

}

  // onSubmit() {
  //  alert('Thanks!');
  // }

  ngOnInit() {

  }

onformSubmit(form:NgForm){
  this.isloadingResults = true;
    // check if the Demandeurformation id is available and add form jump to update if present
    if (this.id == null || undefined ){
        this.api.addDemandeurFormation(this.demandeurId, this.formationId, form)
        .subscribe(
          res=> {
            this.isloadingResults=false;
          },(err) => {
            console.log(err);
            this.isloadingResults=false;
          },
        )
    } else {
      this.api.updateDemandeurFormation(this.demandeurId, this.formationId , this.id ,form)
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
