import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, catchError, finalize } from 'rxjs/operators';
import { Observable, of as observableOf, merge, from, of, BehaviorSubject } from 'rxjs';
import { DemandeEquivalence } from './../../demandeEquivalence';
import { MyApiService } from 'src/app/my-api.service';


/**
 * Data source for the DemandeEquivalence view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DemandeEquivalenceDataSource extends DataSource<DemandeEquivalence> {

  connect(collectionViewer: CollectionViewer): Observable<DemandeEquivalence[]> {
    console.log("Connecting demandeEquivalence datasource");
    return this.demandeEquiSubject.asObservable();
}

  disconnect(collectionViewer: CollectionViewer): void {
    this.demandeEquiSubject.complete();
    this.loadingSubject.complete();
}

  data: DemandeEquivalence[] = [];
  paginator: MatPaginator;
  sort: MatSort;

  private demandeEquiSubject = new BehaviorSubject<DemandeEquivalence[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public totalElements : any;

  constructor(private apiService: MyApiService) {

     super();
  }

  loadDemandeEqui(id:any , pageIndex:number, pageSize:number) {
    this.loadingSubject.next(true);
    this.apiService.getDemandeEquivalencePagination(id , pageIndex, pageSize)
    .pipe(catchError(() => of([])),finalize(() => this.loadingSubject.next(false)))
    .subscribe(Result =>{
    // console.log(Result); // demandeur json object
    this.totalElements = Result['totalElements'];
    // console.log(this.totalElements); // number of elements in my array
    this.demandeEquiSubject.next(Result['content'])});
  }

}
