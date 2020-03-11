import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MyApiService } from '../../my-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormationDataSource } from '../formation-datasource';
import { MatTable, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { Formation } from '../formation';
import { tap } from 'rxjs/operators';
import { FormationEditComponent } from '../formation-edit/formation-edit.component';
import { NotificationService } from '../../shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';
@Component({
  selector: 'app-formation-add',
  templateUrl: './formation-add.component.html',
  styleUrls: ['./formation-add.component.css']
})

export class FormationAddComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Formation>;
  dataSource: FormationDataSource;

  @Input()
  formation:Formation[];

  displayedColumns: string[] = ['id','nom','specialite','niveau' ,'estDiplomate' , 'update' , 'delete' ];

  isLoadingResults = false;

  constructor(private route:ActivatedRoute , private router: Router,
              private notificationService : NotificationService,
              private dialogService: DialogService,
              private api: MyApiService, private dialog: MatDialog ) {}

  ngOnInit() {
    this.dataSource = new FormationDataSource(this.api);
    this.dataSource.loadFormation(0 , 5);

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
    this.paginator.page.pipe(
        tap(() => this.loadFormationPage()))
    .subscribe();
  }

  loadFormationPage() {
   this.dataSource.loadFormation(this.paginator.pageIndex, this.paginator.pageSize);
  }

  addformation(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width='600px';
    dialogConfig.height='260px';
    let data = {};
    dialogConfig.data = data
    const dialogRef = this.dialog.open(FormationEditComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.isLoadingResults=true;
      this.loadFormationPage();
      this.isLoadingResults=false;


    });
}

// this editformation button redirect to formationEdit therefore all config related to the dialog goes in there
editFormation({ id , nom , specialite , niveau , estDiplomate  }:Formation) {

  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width='600px';
  dialogConfig.height='260px';
  let data = { id , nom , specialite , niveau , estDiplomate };
  dialogConfig.data = data;
  const dialogRef = this.dialog.open(FormationEditComponent,dialogConfig);
  dialogRef.beforeClosed().subscribe(() => {
    this.isLoadingResults=true;
    this.loadFormationPage();
    this.isLoadingResults=false;

  });
}

deleteFormation(id:number){
  this.dialogService.openConfirmDialog("Êtes-vous certain , Cette action est définitive et irréversible")
  .afterClosed().subscribe(res =>{
     if (res){
  this.isLoadingResults = true;
  this.api.DeleteFormation(id)
  .subscribe(() => {
    this.isLoadingResults=false;
    this.loadFormationPage();
    this.notificationService.warn(` ! formation ${id} suppimé avec succes `);
       },  (err) => {
    console.log(err);
    this.isLoadingResults=false
     });
    }
  });
 }

}
