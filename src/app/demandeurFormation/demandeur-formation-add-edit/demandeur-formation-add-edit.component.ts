import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm  , FormControl  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MyApiService } from 'src/app/my-api.service';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTable } from '@angular/material';
import { FormationDataSource } from 'src/app/formation/formation/formation/formation-datasource';
import { Formation } from 'src/app/formation/formation';
import { tap } from 'rxjs/operators';
import { runInThisContext } from 'vm';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
@Component({
  selector: 'app-demandeur-formation-add-edit',
  templateUrl: './demandeur-formation-add-edit.component.html',
  styleUrls: ['./demandeur-formation-add-edit.component.css']
})
export class DemandeurFormationAddEditComponent implements OnInit {

  formationData : Array<any> ;
  nomFromSelect : string ;
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

            this.id=data.id; // assign Demandeurformation.id from dialog.id  to formation id
            this.demandeurId = data.demandeurId;
            this.formationData = data.formationData;
            console.log(this.formationData);
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

selectChange($event){ // get the selected option name and do stuff with it
 //console.log(` nomFromSelect = ` , $event);
 this.nomFromSelect = $event;
 this.formationData.forEach(obj => {
   if (obj['nom']==this.nomFromSelect){ // compare the value i get nom from select and do stuff and assign to formationId
    let idValue = obj['id'];
    this.formationId = idValue;
   }
 })


}

 get formation() : string {
//   //this.nom = this.jsonformationSelected['nom'].nom;
 return this.form ? this.form.get('nomFormation').value : '';
//   return this.form.controls['nomFormation'].setValue(this.jsonformationSelected['nom']);
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
    } else if (this.formationId == null ){ // in case the formationId is null i will update anyway , this is a work-around for the selected item not sending the id
       this.api.updateDemandeurFormationWithNoFormationId(this.demandeurId , this.id , form)
       .subscribe(res => {
         this.isloadingResults = false;
       }, (err) => {
         console.log(err);
       })
    }else {
      this.api.updateDemandeurFormation(this.demandeurId, this.id ,this.formationId ,form)
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
