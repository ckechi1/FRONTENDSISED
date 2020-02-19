import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FormationDataSource } from './formation-datasource';
import { Formation } from '../../formation';
import { MyApiService} from '../../../my-api.service';
import { DemandeurDetailComponent} from '../../../demandeur/demandeur-detail/demandeur-detail.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements AfterViewInit, OnInit {
  [x: string]: any;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Formation>;
  dataSource: FormationDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['id','nom', 'pays','specialite','dateObtention', 'etablissement'];
  data: Formation[] = [];
  isLoadingResults = true;

  constructor(private api : MyApiService , private route : ActivatedRoute , private router:Router) {
  }

  ngOnInit() {

   let id = this.route.params['id'];
    console.log(id)
    this.dataSource = new FormationDataSource();
      this.api.getFormations(id)
         .subscribe((res: any) => {
           this.data = res;
           console.log(this.data);
           this.isLoadingResults = false;
         }, err => {
           console.log(err);
           this.isLoadingResults = false;
         });

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
