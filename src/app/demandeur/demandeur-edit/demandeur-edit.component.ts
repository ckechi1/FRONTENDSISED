import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyApiService } from '../../my-api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-demandeur-edit',
  templateUrl: './demandeur-edit.component.html',
  styleUrls: ['./demandeur-edit.component.css']
})
export class DemandeurEditComponent implements OnInit {

  formulaireDemandeur :FormGroup;
  id:number=null;
  nom:string ='';
  prenom:string='';
  genre:string='';
  nationalite:string='';
  dateNaissance:string='';
  lieuNaissance:string='';
  adresse:string='';
  telephone:number=null;
  email:string='';
  status:string='';
  numeroPieceDidentite:number=null;
  isloadingResults=false;

  constructor(private router: Router, private route: ActivatedRoute, private api: MyApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getDemandeur(this.route.snapshot.params['id']);
    //this.id  = this.route.snapshot.params['id'];
    console.log(this.id);
    this.formulaireDemandeur = this.formBuilder.group({
      'nom' : [null, Validators.required],
      'prenom' : [null, Validators.required],
      'genre': [null, Validators.required],
      'nationalite': [null, Validators.required],
      'dateNaissance': [null, Validators.required],
      'lieuNaissance': [null, Validators.required],
      'adresse': [null, Validators.required],
      'telephone': [null, Validators.required],
      'email': [null, Validators.required],
      'status': [null, Validators.required],
      'numeroPieceDidentite': [null, Validators.required],
    });
  }

  getDemandeur(id:any){
    this.api.getDemandeur(id).subscribe(data=>{
      this.id = data.id;
      this.formulaireDemandeur.setValue({
        nom : data.nom,
        prenom : data.prenom,
        genre : data.genre,
        nationalite :data.nationalite,
        dateNaissance : data.dateNaissance,
        lieuNaissance: data.lieuNaissance,
        adresse : data.adresse,
        telephone : data.telephone,
        email : data.email,
        status : data.status,
        numeroPieceDidentite : data.numeroPieceDidentite
      })
    })
  }

  onFormSubmit(form:NgForm){
    this.isloadingResults = true;
    //console.log(this.id);
    this.api.updateDemandeur(this.id,form)
    .subscribe(res => {
      let id = res['id'];
      this.isloadingResults = false;
      this.router.navigate(['/demandeur-detail',id]);
    }, (err) => {
      console.log(err);
      this.isloadingResults = false;
    })

  }
  demandeurDetails() {
    this.router.navigate(['/demandeur-detail', this.id]);
  }
}
