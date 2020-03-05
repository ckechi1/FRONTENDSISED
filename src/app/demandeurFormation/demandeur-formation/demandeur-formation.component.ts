import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DemandeurFormation } from '../demandeurFormation';
import { DemandeurFormationDataSource } from '../demandeurFormationDataSource';
import { MatTable, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { MyApiService } from 'src/app/my-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { DemandeurFormationAddEditComponent } from '../demandeur-formation-add-edit/demandeur-formation-add-edit.component';
import { Formation } from 'src/app/formation/formation';
import { FormationDataSource } from 'src/app/formation/formation/formation/formation-datasource';

@Component({
  selector: 'app-demandeur-formation',
  templateUrl: './demandeur-formation.component.html',
  styleUrls: ['./demandeur-formation.component.css']
})

export class DemandeurFormationComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<DemandeurFormation>;
  dataSource: DemandeurFormationDataSource;

  dataSourceFormation : FormationDataSource;

  public formation: Array<any>;


  @Input()
  demandeurFormation:DemandeurFormation[];
  public id :any = +this.route.snapshot.paramMap.get('id'); // get the demandeur id

  displayedColumns : string[] =  ['id', 'nomFormation','mention', 'promotion','pays','dateObtention', 'etablissement','update','delete'];
  isLoadingResults = true;

  constructor(private apiService : MyApiService , private route : ActivatedRoute ,
              private router:Router , private dialog: MatDialog) {
  }

  ngOnInit() {
     this.dataSource = new DemandeurFormationDataSource(this.apiService);
     this.dataSource.loadDemandeurFormation(this.id, 0 , 2);

     this.getFormationData();

   }

   ngAfterViewInit() {
     this.dataSource.sort = this.sort;
     this.table.dataSource = this.dataSource;
     this.paginator.page.pipe(tap(() => this.loadDemandeurFormationPage()))
     .subscribe();
   }


   loadDemandeurFormationPage() {
    this.dataSource.loadDemandeurFormation(this.id , this.paginator.pageIndex, this.paginator.pageSize);
   }

  getFormationData(){
    this.apiService.GetAllFormation().subscribe((data) => {
      if (data) {
         this.formation = data;
      }
     //  console.log(this.formation);
     });
  }

 addDemandeurFormation(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width='600px';
  dialogConfig.height='330px';
 // dialogConfig.position={ right: '30px', bottom: '130px' }
  const demandeurId = this.id ;
  const formationData = this.formation;
 // console.log(`list side `, formationData)
  let data = { demandeurId , formationData };
  dialogConfig.data = data
  const dialogRef = this.dialog.open(DemandeurFormationAddEditComponent,dialogConfig);

  dialogRef.afterClosed().subscribe(() => {
    this.loadDemandeurFormationPage();

  });
}


// this editformation button redirect to formationEdit therefore all config related to the dialog goes in there
editDemandeurFormation({ id , nomFormation , mention, promotion , pays , etablissement , dateObtention }:DemandeurFormation) {
const dialogConfig = new MatDialogConfig();
dialogConfig.disableClose = true;
dialogConfig.autoFocus = true;
dialogConfig.width='600px';
dialogConfig.height='330px';
const demandeurId = this.id ;
const formationData = this.formation;

let data = { formationData, demandeurId , id , nomFormation , mention, promotion , pays , etablissement , dateObtention };
dialogConfig.data = data;
const dialogRef = this.dialog.open(DemandeurFormationAddEditComponent,dialogConfig);
dialogRef.beforeClosed().subscribe(() => {

  this.loadDemandeurFormationPage();

   });
  }

deleteDemandeurFormation( demandeurFormationId:number , formationId:number ){
this.isLoadingResults = true;
this.apiService.DeleteDemandeurFormation(this.id , demandeurFormationId , formationId)
.subscribe(() => {
  this.isLoadingResults=false;
  this.loadDemandeurFormationPage();
  },(err) => {
  console.log(err);
  this.isLoadingResults=false;
   })
  }
}
