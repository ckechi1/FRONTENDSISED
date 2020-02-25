import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import { Demandeur } from './demandeur';
import { MyApiService } from '../my-api.service';
import {catchError, finalize} from "rxjs/operators";

export class demandeurDataSource implements DataSource<Demandeur> {

    private DemandeurSubject = new BehaviorSubject<Demandeur[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public totalElements : number;

    constructor(private apiService: MyApiService) {

    }

    loadDemandeur(pageIndex:number, pageSize:number) {
        this.loadingSubject.next(true);
        this.apiService.findDemandeurPagination(pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(Result =>{
           //   console.log(Result); // demandeur json object
              this.totalElements = Result.totalElements;
           //   console.log(this.totalElements); // number of elements in my array
              this.DemandeurSubject.next(Result.content)});
    }

    connect(collectionViewer: CollectionViewer): Observable<Demandeur[]> {
        console.log("Connecting data source");
        return this.DemandeurSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.DemandeurSubject.complete();
        this.loadingSubject.complete();
    }


}
