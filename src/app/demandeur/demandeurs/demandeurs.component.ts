import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MyApiService } from '../../my-api.service';
import { Demandeur} from '../demandeur';
import { demandeurDataSource } from '../demandeurDataSource';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, MatSort } from '@angular/material';
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge, fromEvent} from "rxjs";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-demandeurs',
  templateUrl: './demandeurs.component.html',
  styleUrls: ['./demandeurs.component.scss']
})

export class DemandeursComponent implements OnInit {

  demandeur:Demandeur;
  dataSource: demandeurDataSource;
  @ViewChild(MatPaginator , {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort , {static: false}) sort: MatSort;
  //@ViewChild('input' , {static: false}) input: ElementRef;

  displayedColumns: string[] = ['id','nom', 'prenom','genre','nationalite', 'dateNaissance','lieuNaissance','adresse','telephone','email','status','numeroPieceDidentite'];
 // data: Demandeur[] = [];
//isLoadingResults = true;

  constructor(private apiService : MyApiService , private route: ActivatedRoute,) { }

  ngOnInit() {

    //this.demandeur = this.route.snapshot.data["demandeur"];
    this.dataSource = new demandeurDataSource(this.apiService);
    this.dataSource.loadDemandeur(0, 5);

  }

  ngAfterViewInit() {

  //  this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  //    fromEvent(this.input.nativeElement,'keyup')
  //        .pipe(
  //            debounceTime(150),
  //            distinctUntilChanged(),
  //            tap(() => {
  //                this.paginator.pageIndex = 0;
  //                this.loadDemandeurPage();
  //           })
  //      )
  //    .subscribe();

    // merge(this.sort.sortChange, this.paginator.page)
    // .pipe(
    //     tap(() => this.loadDemandeurPage() )
    // )
    // .subscribe();

    this.paginator.page
    .pipe(
        tap(() => this.loadDemandeurPage())
    )
    .subscribe();
}

loadDemandeurPage() {
    this.dataSource.loadDemandeur( this.paginator.pageIndex, this.paginator.pageSize);
}

}
