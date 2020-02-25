import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DemandeEquivalenceDataSource } from './demande-equivalence-datasource';
import { DemandeEquivalence } from './../../demandeEquivalence';
import { ActivatedRoute, Router } from '@angular/router';
import { MyApiService } from 'src/app/my-api.service';
import { tap } from 'rxjs/operators';
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
  public  id = +this.route.snapshot.paramMap.get('id');

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns : string[] =  ['id', 'dateDepot','numeroRecepisse', 'numeroBordereau','diplomeAnterieur','diplomeDemande','update','delete',];
  //data: DemandeEquivalence[] = [];
  isLoadingResults = true;

  constructor(private apiService : MyApiService , private route : ActivatedRoute , private router:Router) {
  }

  ngOnInit() {

    // const id = +this.route.snapshot.paramMap.get('id');
     this.dataSource = new DemandeEquivalenceDataSource(this.apiService);
     this.dataSource.loadDemandeEqui(this.id, 0 , 2);

   }


   ngAfterViewInit() {
     this.dataSource.sort = this.sort;
     this.table.dataSource = this.dataSource;

     this.paginator.page
     .pipe(
         tap(() => this.loadDemandeEquiPage() )
     )
     .subscribe();

   }


   loadDemandeEquiPage() {
  //  const id  = this.route.snapshot.paramMap.get('id')
    this.dataSource.loadDemandeEqui(this.id , this.paginator.pageIndex, this.paginator.pageSize);
   }


 }

  // doFilter = (value: any) => {
  //   this.dataSource.data.filter = value.trim().toLocaleLowerCase();
  // }

