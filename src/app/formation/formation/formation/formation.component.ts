import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { FormationDataSource } from './formation-datasource';
import { Formation } from '../../formation';
import { MyApiService} from '../../../my-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormationEditComponent } from '../../formation-edit/formation-edit.component';
import * as moment from 'moment';

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

  @Input()
  formation:Formation[];
  public id :any = +this.route.snapshot.paramMap.get('id'); // get the demandeur id

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['id','nom', 'pays','specialite','dateObtention', 'etablissement' , 'update', 'delete'];
 // data: Formation[] = [];
  isLoadingResults = true;


  constructor(private apiService : MyApiService , private route : ActivatedRoute ,
              private router:Router, private dialog: MatDialog) {

  }

  ngOnInit() {
   // const id = +this.route.snapshot.paramMap.get('id');
    this.dataSource = new FormationDataSource(this.apiService);
    this.dataSource.loadFormation(this.id, 0 , 3);

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

  addformation(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width='600px';
      dialogConfig.height='280px';
      dialogConfig.position={ right: '30px', bottom: '130px' }
      const demandeurId = this.id ;
      let data = { demandeurId };
      dialogConfig.data = data
      const dialogRef = this.dialog.open(FormationEditComponent,dialogConfig);

      dialogRef.afterClosed().subscribe(() => {
        this.loadFormationPage();

      });
  }

  // this editformation button redirect to formationEdit therefore all config related to the dialog goes in there
  editFormation({ id , nom , pays, specialite , dateObtention , etablissement }:Formation) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='600px';
    dialogConfig.height='280px';
    const demandeurId = this.id ;
    let data = { demandeurId , id , nom , pays, specialite , dateObtention , etablissement };
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(FormationEditComponent,dialogConfig);
    dialogRef.beforeClosed().subscribe(() => {

      this.loadFormationPage();

    });

  }

  deleteFormation(formationId:number){
    this.isLoadingResults = true;
    this.apiService.DeleteFormation(this.id , formationId)
    .subscribe(() => {
      this.isLoadingResults=false;
      this.loadFormationPage();
    },  (err) => {
      console.log(err);
      this.isLoadingResults=false
    })

  }

}
