import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MyApiService } from 'src/app/my-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demandeur-formation-add',
  templateUrl: './demandeur-formation-add.component.html',
  styleUrls: ['./demandeur-formation-add.component.css']
})
export class DemandeurFormationAddComponent implements OnInit {

  formationData : Array<any> ;
  nomFromSelectFormationID : number ;
  public demandeurId : number;

  form :FormGroup;
  id:number=null;
  formationId:number=null;
  mention:string='';
  promotion:string='';
  pays:string='';
  dateObtention:Date=null;
  etablissement:string='';
  isloadingResults=false;

constructor(private router: Router, private route: ActivatedRoute,
            private api: MyApiService,private fb: FormBuilder,
            private dialogRef: MatDialogRef<DemandeurFormationAddComponent>,
           @Inject(MAT_DIALOG_DATA) data :any ){

            this.demandeurId = data.demandeurId;
            this.formationData = data.formationData;
            this.form = fb.group({
            formationId:[null, Validators.required],
            dateObtention: [null, Validators.required],
            mention: [null, Validators.required],
            promotion: [null, Validators.required],
            pays: [null, Validators.required],
            etablissement: [null, Validators.required],

  });

}

  ngOnInit() {

  }

 selectChange($event : any ){ // get the selected option name and do stuff with it
 console.log(` nomFromSelect = ` , $event);
 this.nomFromSelectFormationID = $event;
}


onformSubmit(form:NgForm){
  this.isloadingResults = true;
        this.api.addDemandeurFormation(this.demandeurId, this.nomFromSelectFormationID, form)
        .subscribe( res=> { this.isloadingResults=false;
          },(err) => {
            console.log(err);
            this.isloadingResults=false;
          },
        )
     }

 save() {
  this.dialogRef.close(this.onformSubmit(this.form.value));
}

close() {
  this.dialogRef.close();
 }
}
