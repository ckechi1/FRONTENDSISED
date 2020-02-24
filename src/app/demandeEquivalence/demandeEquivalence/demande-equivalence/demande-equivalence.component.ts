import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DemandeEquivalenceDataSource } from './demande-equivalence-datasource';
import { DemandeEquivalence } from './../../demandeEquivalence';
import { ActivatedRoute, Router } from '@angular/router';
import { MyApiService } from 'src/app/my-api.service';
@Component({
  selector: 'app-demande-equivalence',
  templateUrl: './demande-equivalence.component.html',
  styleUrls: ['./demande-equivalence.component.css']
})
export class DemandeEquivalenceComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<DemandeEquivalence>;
  dataSource: DemandeEquivalenceDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns : string[] =  ['id', 'dateDepot','numeroRecepisse', 'numeroBordereau','diplomeAnterieur','diplomeDemande','update','delete',];
  //data: DemandeEquivalence[] = [];
  isLoadingResults = true;


  ngOnInit() {

    this.dataSource = new DemandeEquivalenceDataSource();
    this.getDemandeEquivalence();
    this.dataSource.data = [];

  }

  constructor(private api : MyApiService , private route : ActivatedRoute , private router:Router){
  }


  doFilter = (value: any) => {
    this.dataSource.data.filter = value.trim().toLocaleLowerCase();
  }

  getDemandeEquivalence(){
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.api.getDemandeEquivalence(id)
    .subscribe((res:any) => {
       this.table.dataSource=res;
       this.isLoadingResults=false;
    },err =>{
       this.isLoadingResults=false;
    });
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
