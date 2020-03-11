import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DemandeurFormation } from '../demandeurFormation';
import { DemandeurFormationDataSource } from '../demandeurFormationDataSource';
import { MatTable, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { MyApiService } from 'src/app/my-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { DemandeurFormationEditComponent } from '../demandeur-formation-edit/demandeur-formation-edit.component';
import { DemandeurFormationAddComponent } from '../demandeur-formation-add/demandeur-formation-add.component';
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
     this.dataSource.loadDemandeurFormation(this.id, 0 , 3);
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

  let data = { demandeurId , formationData };
  console.log(data);
  dialogConfig.data = data;
  const dialogRef = this.dialog.open(DemandeurFormationAddComponent,dialogConfig);

   dialogRef.beforeClosed().subscribe(()=>{
     this.isLoadingResults=true;
     this.loadDemandeurFormationPage();
     this.isLoadingResults=false;
   });
}


// this editformation button redirect to formationEdit therefore all config related to the dialog goes in there
editDemandeurFormation(demandeurFormation:DemandeurFormation) {
const dialogConfig = new MatDialogConfig();
dialogConfig.disableClose = true;
dialogConfig.autoFocus = true;
dialogConfig.width='600px';
dialogConfig.height='330px';
const formationData = this.formation;

let data = { formationData , demandeurFormation };
dialogConfig.data = data;
const dialogRef = this.dialog.open(DemandeurFormationEditComponent,dialogConfig);
dialogRef.beforeClosed().subscribe((val)=>{
  this.isLoadingResults=true;
  this.loadDemandeurFormationPage();
  this.isLoadingResults=false;
});
  }

deleteDemandeurFormation(demandeurFormationId:number){
this.isLoadingResults = true;
this.apiService.DeleteDemandeurFormation(this.id , demandeurFormationId )
.subscribe(() => {
  this.isLoadingResults=false;
  this.loadDemandeurFormationPage();
  },(err) => {
  console.log(err);
  this.isLoadingResults=false;
   })
  }
}
