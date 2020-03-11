import { Component, OnInit, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTable } from '@angular/material';
import { FormBuilder, Validators, FormGroup, NgForm, Form } from '@angular/forms';
import { Formation } from '../formation';
import { Router, ActivatedRoute } from '@angular/router';
import { MyApiService } from 'src/app/my-api.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-formation-edit',
  templateUrl: './formation-edit.component.html',
  styleUrls: ['./formation-edit.component.css']
})

export class FormationEditComponent implements OnInit {

  formation : any;

  form: FormGroup;
  id:number=null;
  nom:string='';
  specialite:string='';
  niveau:Date=null;
  estDiplomate:string='';
  isloadingResults=false;

  constructor(private router: Router, private route: ActivatedRoute,
             private notificationService : NotificationService,
             private api: MyApiService,private fb: FormBuilder,
             private dialogRef: MatDialogRef<FormationEditComponent>,
             @Inject(MAT_DIALOG_DATA) data){

             this.id=data.id; // assign formation.id from dialog.id  to formation id
             this.form = fb.group({
             nom: [data.nom, Validators.required],
             niveau: [data.niveau, Validators.required],
             specialite: [data.specialite, Validators.required],
             estDiplomate: [data.estDiplomate, Validators.required],
      });

  }

  ngOnInit() {

   //this.getFormationDetails(this.demandeurId,this.id)

  }

onFormSubmit(form:NgForm){
    this.isloadingResults = true;
    // check if the formation id is available and add form jump to update if present
    if (this.id == null || undefined ){
        this.api.addFormation(form)
        .subscribe(
          res=> {
           // let data = res;
            this.isloadingResults=false;
            this.notificationService.success(' : : Accomplie avec succès ');
            this.dialogRef.close();
          },(err) => {
            console.log(err);
            this.isloadingResults=false;
          },
        )
    } else {
      this.api.updateFormation(this.id,form)
      .subscribe(res => {
       this.isloadingResults = false;
       this.notificationService.success(' : : Accomplie avec succès ');
       this.dialogRef.close();
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
