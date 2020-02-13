import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Demandeur } from './demandeur/demandeur';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const UrlApi = "/SISED/demandeur/";

@Injectable({
  providedIn: 'root'
})
export class MyApiService {

  constructor(private http: HttpClient) { }

  getDemandeurs(): Observable<Demandeur[]>{
     return this.http.get<Demandeur[]>(UrlApi)
     .pipe(tap(Demandeur =>console.log('demandeurs retourné')),
     catchError(this.handleError('getDemandeurs',[]))
     );
  }
  getDemandeur(id:number):Observable<Demandeur>{
    const url =`${UrlApi}/${id}`;
    return this.http.get<Demandeur>(url).pipe(
   tap(_=>console.log(`demandeur retourné id=${id}`)),
   catchError(this.handleError<Demandeur>(`getDemandeur id=${id}`))
   );
   }
   addDemandeur(demandeur: Demandeur): Observable<Demandeur> {
     return this.http.post<Demandeur>(UrlApi, demandeur, httpOptions).pipe(
       tap((deman: Demandeur) => console.log(`demandeur ajouté w/ id=${demandeur.id}`)),
       catchError(this.handleError<Demandeur>('addDemandeur'))
     );
   }

   updateDemandeur(id:number , demandeur): Observable<any> {
     const url = `${UrlApi}/${id}`;
     return this.http.put(url, demandeur, httpOptions).pipe(
       tap(_ => console.log(`demandeur modifié id=${id}`)),
       catchError(this.handleError<any>('updateDemande'))
     );
   }

  deleteDemandeur(id: any): Observable<Demandeur> {
    const url = `${UrlApi}/${id}`;
    return this.http.delete<Demandeur>(url, httpOptions).pipe(
      tap(_ => console.log(`demandeur supprimé id=${id}`)),
      catchError(this.handleError<Demandeur>('deleteDemande'))
    );
  }

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    //  send the error to remote logging infrastructure
    console.error(error); // log to console instead
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


}
