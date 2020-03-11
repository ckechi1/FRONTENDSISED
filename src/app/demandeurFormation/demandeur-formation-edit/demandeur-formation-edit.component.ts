import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm  , FormControl  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MyApiService } from 'src/app/my-api.service';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTable } from '@angular/material';
import { NotificationService } from '../../shared/notification.service';
@Component({
  selector: 'app-demandeur-formation-edit',
  templateUrl: './demandeur-formation-edit.component.html',
  styleUrls: ['./demandeur-formation-edit.component.css']
})
export class DemandeurFormationEditComponent implements OnInit {

  formationData : Array<any> ;
  nomFromSelectFormationID : number ;
  public demandeurId : number;

 // public formationId : number;

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
            private notificationService : NotificationService,
            private dialogRef: MatDialogRef<DemandeurFormationEditComponent>,
           @Inject(MAT_DIALOG_DATA) data :any ){

            this.id=data.demandeurFormation.id; // assign Demandeurformation.id from data
            this.demandeurId = data.demandeurFormation.demandeur.id;
            this.formationData = data.formationData;
            this.formationId = data.demandeurFormation.formation.id;
            this.form = fb.group({
            formationId:[(data.demandeurFormation.formation.id), Validators.required],
            dateObtention: [new Date(data.demandeurFormation.dateObtention), Validators.required],
            mention: [data.demandeurFormation.mention, Validators.required],
            promotion: [data.demandeurFormation.promotion, Validators.required],
            pays: [data.demandeurFormation.pays, Validators.required],
            etablissement: [data.demandeurFormation.etablissement, Validators.required],

  });

}

  // onSubmit() {
  //  alert('Thanks!');
  // }

  ngOnInit() {

  }


 selectChange($event:number){ // get the selected option name and do stuff with it
 console.log(` nomFromSelectFormationID = ` , $event);
 this.formationId = $event;

}


onformSubmit(form:NgForm){
  this.isloadingResults = true;
      this.api.updateDemandeurFormation(this.demandeurId, this.id ,this.formationId ,form)
      .subscribe(res => {
       this.isloadingResults = false;
       this.notificationService.success(' : : Accomplie avec succès ');
       this.dialogRef.close();
      }, (err) => {
        console.log(err);
         this.isloadingResults = false;
    })
 }


 save() {
  this.dialogRef.close(this.onformSubmit(this.form.value));
}

close() {
  this.dialogRef.close();
 }
}
