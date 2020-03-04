import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, catchError, finalize } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of } from 'rxjs';
import { DemandeurFormation } from'../demandeurFormation/demandeurFormation';
import { MyApiService } from 'src/app/my-api.service';

/**
 * Data source for the Formation view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */

export class DemandeurFormationDataSource extends DataSource<DemandeurFormation> {

  connect(collectionViewer: CollectionViewer): Observable<DemandeurFormation[]> {
    console.log("Connecting DemandeurFormation datasource");
    return this.demandeurFormationSubject.asObservable();
}

  disconnect(collectionViewer: CollectionViewer): void {
    this.demandeurFormationSubject.complete();
    this.loadingSubject.complete();
}

  data: DemandeurFormation[] = [];
  paginator: MatPaginator;
  sort: MatSort;

  private demandeurFormationSubject = new BehaviorSubject<DemandeurFormation[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public totalElements : number;

  constructor(private apiService: MyApiService) {

     super();

  }

  loadDemandeurFormation(id : any , pageIndex:number, pageSize:number) {
    this.loadingSubject.next(true);
    this.apiService.findDemandeurFormationPagination( id , pageIndex, pageSize ).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
          .subscribe(Result =>{
          console.log(Result); // demandeurFormation json object
          this.totalElements = Result.totalElements; // console.log(this.totalElements); // number of elements in my array
          this.demandeurFormationSubject.next(Result.content)});
  }

}
