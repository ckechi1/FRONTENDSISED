import { Component, OnInit } from '@angular/core';
import { MyApiService } from '../../my-api.service';
import { Demandeur} from '../demandeur'; 

@Component({
  selector: 'app-demandeurs',
  templateUrl: './demandeurs.component.html',
  styleUrls: ['./demandeurs.component.scss']
})
export class DemandeursComponent implements OnInit {

  displayedColumns: string[] = ['_id','nom', 'prenom','genre','nationalite', 'dateNaissance','lieuNaissance','adresse','telephone','email','status','numeroPieceDidentite'];
  data: Demandeur[] = [];
  isLoadingResults = true;

  constructor(private api : MyApiService) { }

  ngOnInit() {
   this.api.getDemandeurs()
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
