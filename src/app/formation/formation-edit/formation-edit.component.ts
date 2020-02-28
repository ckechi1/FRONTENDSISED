import { Component, OnInit, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTable } from '@angular/material';
import { FormBuilder, Validators, FormGroup, NgForm, Form } from '@angular/forms';
import { Formation } from '../formation';
import { Router, ActivatedRoute } from '@angular/router';
import { MyApiService } from 'src/app/my-api.service';
import { FormationComponent} from '../formation/formation/formation.component';

@Component({
  selector: 'app-formation-edit',
  templateUrl: './formation-edit.component.html',
  styleUrls: ['./formation-edit.component.css']
})

export class FormationEditComponent implements OnInit {

  formation : any;
  public demandeurId : number;

  form: FormGroup;
  id:number=null;
  nom:string='';
  pays:string='';
  specialite:string='';
  dateObtention:Date=null;
  etablissement:string='';
  isloadingResults=false;

  constructor(private router: Router, private route: ActivatedRoute,
             private api: MyApiService,private fb: FormBuilder,
             private dialogRef: MatDialogRef<FormationEditComponent>,
             @Inject(MAT_DIALOG_DATA) data){

             this.id=data.id; // assign formation.id from dialog.id  to formation id
             this.demandeurId = data.demandeurId;
             //  console.log(`demandeurId=${this.demandeurId} , FormationId=${this.id}`);
             this.form = fb.group({
             nom: [data.nom, Validators.required],
             pays: [data.pays, Validators.required],
             specialite: [data.specialite, Validators.required],
             dateObtention: [data.dateObtention, Validators.required],
             etablissement: [data.etablissement, Validators.required],
      });

  }

  ngOnInit() {

   //this.getFormationDetails(this.demandeurId,this.id)

  }

onFormSubmit(form:NgForm){
    this.isloadingResults = true;
    // check if the formation id is available and add form jump to update if present
    if (this.id == null || undefined ){
        this.api.addFormation(this.demandeurId,form)
        .subscribe(
          res=> {
           // let data = res;
            this.isloadingResults=false;
          },(err) => {
            console.log(err);
            this.isloadingResults=false;
          },
        )
    } else {
      this.api.updateFormation(this.demandeurId, this.id,form)
      .subscribe(res => {
       // let id = res['id'];
       this.isloadingResults = false;
       // this.router.navigate(['/formation-detail',id]);
       }, (err) => {
        console.log(err);
         this.isloadingResults = false;
    })
  }
}


  save() {
      this.dialogRef.close(this.onFormSubmit(this.form.value));
  }

  close() {

      this.dialogRef.close();
  }

  // getFormationDetails(id1:number , id2:number) {
  //   this.api.getFormation(id1 , id2)
  //     .subscribe((data: any) => {
  //       this.formation = data;
  //       console.log(this.formation);
  //       this.isloadingResults = false;
  //     });
  // }

}
