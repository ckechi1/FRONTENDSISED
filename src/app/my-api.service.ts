import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Demandeur } from './demandeur/demandeur';
import { Formation } from './formation/formation';
import { DemandeEquivalence } from './demandeEquivalence/demandeEquivalence';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const UrlApi = "/SISED/demandeur";

@Injectable({
  providedIn: 'root'
})

export class MyApiService {

  constructor(private http: HttpClient) { }

  findDemandeurPagination(pageNumber = 0, pageSize = 2):  Observable<any> {
   const url = `${UrlApi}?page=${pageNumber}&size=${pageSize}`
   return this.http.get<Demandeur[]>(url)
     .pipe(tap(_ =>console.log('demandeurs paginé retourné')),
     catchError(this.handleError('findDemandeurPagination',[]))
     );
}


getDemandeurs(): Observable<Demandeur[]>{
     return this.http.get<Demandeur[]>(UrlApi)
     .pipe(tap(_ =>console.log('demandeurs retourné')),
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

addDemandeur(demandeur : Demandeur):Observable<Demandeur> {
    return this.http.post<Demandeur>(UrlApi, demandeur, httpOptions).pipe(
      tap((newdemandeur : Demandeur) => console.log(`added demandeur w/ id=${newdemandeur.id}`)),
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
   /// formation service ///

addFormation(id:any , formation :Formation){
    id = this.getDemandeur(id);
    console.log(` demandeur retourné = id=${id} `);
    const url = `${UrlApi}/${id}/formation`;

    return this.http.post<Formation>(url,formation,httpOptions)
      .pipe(tap(_=> console.log(`formation ajouté w/ id=${formation.id}`)),
      catchError(this.handleError<Formation>('addFormation'))
    );
  }

getFormations(id:number): Observable<Formation[]>{
    const url = `${UrlApi}/${id}/formation`;
    return this.http.get<Formation[]>(url)
    .pipe(tap(Formation =>console.log(`formation avec demandeur id=${id}`)),
    catchError(this.handleError('getFormations',[]))
    );
 }

    /// DemandeEquivalence service ///

getDemandeEquivalence(id:number):Observable<DemandeEquivalence[]>{
   const url = `${UrlApi}/${id}/DemandeEquivalence`;
   console.log(`demandeEquivalence with id = ${id}`);
   return this.http.get<DemandeEquivalence[]>(url)
   .pipe(tap(DemandeEquivalence=>console.log(`demandeEquivalence with id =${id}`)),
   catchError(this.handleError('getDemandeEquivalence',[]))
   );
 }

addDemandeEquivalence(id:number , demandeEqui:DemandeEquivalence){
    console.log(` demandeur avec id=${id} `);
    const url = `${UrlApi}/${id}/DemandeEquivalence`;

    return this.http.post<DemandeEquivalence>(url,demandeEqui,httpOptions)
      .pipe(tap(_=> console.log(`demandeEquivalence ajouté avec id=${demandeEqui.id}`)),
      catchError(this.handleError<DemandeEquivalence>('addDemandeEquivalence'))
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
