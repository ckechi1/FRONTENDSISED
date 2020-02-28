import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DemandeEquivalenceDataSource } from './demande-equivalence-datasource';
import { DemandeEquivalence } from './../../demandeEquivalence';
import { ActivatedRoute, Router } from '@angular/router';
import { MyApiService } from 'src/app/my-api.service';
import { tap } from 'rxjs/operators';
import { DemandeEquivalenceAddComponent } from '../demande-equivalence-add/demande-equivalence-add.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
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

  @Input()
  demandeEquivalence:DemandeEquivalence[];
  public id :any = +this.route.snapshot.paramMap.get('id'); // get the demandeur id

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns : string[] =  ['id', 'dateDepot','numeroRecepisse', 'numeroBordereau','diplomeAnterieur','diplomeDemande','update','delete',];
  //data: DemandeEquivalence[] = [];
  isLoadingResults = true;

  constructor(private apiService : MyApiService , private route : ActivatedRoute ,
              private router:Router , private dialog: MatDialog) {
  }

  ngOnInit() {
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


 addDemandeEquivalence(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width='600px';
  dialogConfig.height='280px';
  dialogConfig.position={ right: '30px', bottom: '130px' }
  const demandeurId = this.id ;
  let data = { demandeurId };
  dialogConfig.data = data
  const dialogRef = this.dialog.open(DemandeEquivalenceAddComponent,dialogConfig);

  dialogRef.afterClosed().subscribe(() => {
    this.loadDemandeEquiPage();

  });
}


// this editformation button redirect to formationEdit therefore all config related to the dialog goes in there
editDemandeurEquivalence({ id , dateDepot , numeroRecepisse, numeroBordereau , diplomeAnterieur , diplomeDemande }:DemandeEquivalence) {
const dialogConfig = new MatDialogConfig();
dialogConfig.disableClose = true;
dialogConfig.autoFocus = true;
dialogConfig.width='600px';
dialogConfig.height='280px';
const demandeurId = this.id ;
let data = { demandeurId , id , dateDepot , numeroRecepisse, numeroBordereau , diplomeAnterieur , diplomeDemande };
dialogConfig.data = data;
const dialogRef = this.dialog.open(DemandeEquivalenceAddComponent,dialogConfig);
dialogRef.beforeClosed().subscribe(() => {

  this.loadDemandeEquiPage();

});

}

deleteDemandeEquivalence(DemandeEquiId:number){
this.isLoadingResults = true;
this.apiService.deleteDemandeEquivalence(this.id , DemandeEquiId)
.subscribe(() => {
  this.isLoadingResults=false;
  this.loadDemandeEquiPage();
},  (err) => {
  console.log(err);
  this.isLoadingResults=false
})

}

}
