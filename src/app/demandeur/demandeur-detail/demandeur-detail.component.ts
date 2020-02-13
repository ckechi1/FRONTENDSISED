import { Component, OnInit } from '@angular/core';
import { MyApiService } from '../../my-api.service';
import { Demandeur} from '../demandeur'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-demandeur-detail',
  templateUrl: './demandeur-detail.component.html',
  styleUrls: ['./demandeur-detail.component.scss']
})
export class DemandeurDetailComponent implements OnInit {
  
  demandeur : Demandeur ={id:null,nom :'',prenom:'',genre:'',nationalite:'',dateNaissance:'',lieuNaissance:'',adresse:'',telephone:null,email:'',status:'',numeroPieceDidentite:null} ; 
  isLoadingResults=true;

  constructor(private route:ActivatedRoute,private api : MyApiService , private router : Router) { }

  ngOnInit() { 
     
    this.getDemandeurDetails(this.route.snapshot.params['id']) 
    
  }
    
  getDemandeurDetails(id: any) {
    this.api.getDemandeur(id)
      .subscribe((data: any) => {
        this.demandeur = data;
        console.log(this.demandeur);
        this.isLoadingResults = false;
      });
  } 
  deleteDemandeur(id: any) {
    this.isLoadingResults = true;
    this.api.deleteDemandeur(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/demandeurs']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
