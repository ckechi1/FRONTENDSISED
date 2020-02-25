import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FormationDataSource } from './formation-datasource';
import { Formation } from '../../formation';
import { MyApiService} from '../../../my-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Formation>;
  dataSource: FormationDataSource;
  formation:Formation;
  public id :any = +this.route.snapshot.paramMap.get('id');

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['id','nom', 'pays','specialite','dateObtention', 'etablissement' , 'update', 'delete'];
 // data: Formation[] = [];
  isLoadingResults = true;

  constructor(private apiService : MyApiService , private route : ActivatedRoute , private router:Router) {
  }

  ngOnInit() {

   // const id = +this.route.snapshot.paramMap.get('id');
    this.dataSource = new FormationDataSource(this.apiService);
    this.dataSource.loadFormation(this.id, 0 , 2);

  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;

    this.paginator.page
    .pipe(
        tap(() => this.loadFormationPage() )
    )
    .subscribe();

  }


  loadFormationPage() {
 //  const id  = this.route.snapshot.paramMap.get('id')
   this.dataSource.loadFormation(this.id , this.paginator.pageIndex, this.paginator.pageSize);
  }


}
