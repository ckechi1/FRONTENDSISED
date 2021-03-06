import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, catchError, finalize } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of } from 'rxjs';
import { Formation } from'./formation';
import { MyApiService } from 'src/app/my-api.service';

/**
 * Data source for the Formation view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */

export class FormationDataSource extends DataSource<Formation> {

  connect(collectionViewer: CollectionViewer): Observable<Formation[]> {
    console.log("Connecting formation datasource");
    return this.formationSubject.asObservable();
}

  disconnect(collectionViewer: CollectionViewer): void {
    this.formationSubject.complete();
    this.loadingSubject.complete();
}

  data: Formation[] = [];
  paginator: MatPaginator;
  sort: MatSort;

  private formationSubject = new BehaviorSubject<Formation[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public totalElements : number;
  public formationObject : any;

  constructor(private apiService: MyApiService) {

     super();

  }

  loadFormation(pageIndex:number, pageSize:number) {
    this.loadingSubject.next(true);
    this.apiService.findFormationPagination( pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(Result =>{
        //  console.log(Result); // formation json object
          this.totalElements = Result.totalElements; //   console.log(this.totalElements); // number of elements in my array
          this.formationObject = Result.content
        //  console.log(this.formationObject)
          this.formationSubject.next(Result.content)});
  }

}
