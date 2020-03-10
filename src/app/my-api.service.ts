import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Demandeur } from './demandeur/demandeur';
import { Formation } from './formation/formation';
import { DemandeEquivalence } from './demandeEquivalence/demandeEquivalence';
import { DemandeurFormation } from './demandeurFormation/demandeurFormation';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const UrlApi = "/SISED/demandeur";
const UrlApi2 = "/SISED" ;

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

getDemandeur(id:number):Observable<Demandeur>{
    const url =`${UrlApi}/${id}`;
    return this.http.get<Demandeur>(url).pipe(
   tap(_=>console.log(`demandeur retourné id=${id}`)),
   catchError(this.handleError<Demandeur>(`getDemandeur id=${id}`))
   );
 }

addDemandeur(demandeur : Demandeur):Observable<any> {
    return this.http.post<Demandeur>(UrlApi, demandeur, httpOptions).pipe(
      tap((newdemandeur : Demandeur) => console.log(`added demandeur w/ id=${newdemandeur.id}`)),
      catchError(this.handleError<Demandeur>('addDemandeur'))
    );
  }

updateDemandeur(id:number , demandeur): Observable<any> {
     const url = `${UrlApi}/${id}`;
     return this.http.put(url, demandeur, httpOptions).pipe(
       tap(_ => console.log(`demandeur modifié id=${id}`)),
       catchError(this.handleError<any>('updateDemandeur'))
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
GetAllFormation(){
  const url = `${UrlApi2}/formations`
  return this.http.get<Formation[]>(url)
    .pipe(tap(_ =>console.log('Formations paginé retourné')),
    catchError(this.handleError('findformationpaginé',[]))
    );
}

addFormation(formation ): Observable<any>{
    console.log(` formation retourné `);
    const url = `${UrlApi2}/formation`;
    return this.http.post<Formation>(url,formation,httpOptions)
      .pipe(tap(formation=> console.log(`formation ajouté avec id=${formation.id}`)),
      catchError(this.handleError<Formation>('addFormation'))
    );
  }

findFormationPagination(pageNumber = 0, pageSize = 3):Observable<any> {
  const url = `${UrlApi2}/formation?page=${pageNumber}&size=${pageSize}`
  return this.http.get<Formation[]>(url)
    .pipe(tap(_ =>console.log('Formations paginé retourné')),
    catchError(this.handleError('findformationpaginé',[]))
    );
}

getFormation(id:number):Observable<Formation>{
 const url = `${UrlApi2}/formation/${id}`;
 return this.http.get<Formation>(url).pipe(
 tap(_=>console.log(`formation retourné avec id1=${id} `)),
 catchError(this.handleError<Formation>(`getFormation id1=${id}`))
  );
 }

DeleteFormation(id:number):Observable<Formation>{
  const url = `${UrlApi2}/formation/${id}`;
  return this.http.delete<Formation>(url).pipe(
  tap(_=>console.log(`formation retourné avec id=${id}`)),
  catchError(this.handleError<Formation>(`deleteFormation id=${id}`))
   );
}

updateFormation(id:number , formation): Observable<any> {
  const url = `${UrlApi2}/formation/${id}`;
  return this.http.put(url, formation, httpOptions).pipe(
    tap(_ => console.log(`Formation modifié id=${id}`)),
    catchError(this.handleError<any>('updateFormation'))
  );
}
    /// demandeur formation service ///

    addDemandeurFormation( id1:number , id2:number , demandeurFormation  ): Observable<any>{
      console.log(` demandeurFormation retourné `);
      const url = `${UrlApi}/${id1}/demandeurFormation/${id2}`;
      return this.http.post<DemandeurFormation>(url,demandeurFormation,httpOptions)
        .pipe(tap(demanformation=> console.log(`demandeurFormation ajouté avec id = ${id1} and id2 = ${id2}`)),
        catchError(this.handleError<DemandeurFormation>('addDemandeurFormation'))
      );
    }

  findDemandeurFormationPagination( id:number , pageNumber = 0, pageSize = 3):Observable<any> {
    const url =`${UrlApi}/${id}/demandeurFormation?page=${pageNumber}&size=${pageSize}`
    return this.http.get<DemandeurFormation[]>(url)
      .pipe(tap(_ =>console.log(`demandeur Formation paginé retourné avec id ${id}`)),
      catchError(this.handleError('findDemandeurFormationpaginé',[]))
      );
  }

  getDemandeurFormation(id1:number , id2:number , id3:number ):Observable<DemandeurFormation>{
   const url = `${UrlApi}/${id1}/demandeurFormation/${id2}/formation/${id3}`;
   return this.http.get<DemandeurFormation>(url).pipe(
   tap(_=>console.log(`demandeurformation retourné avec id1 = ${id1} , id2 = ${id1} ,  id3 = ${id3} `)),
   catchError(this.handleError<DemandeurFormation>(`getDemandeurFormation id2=${id2}`))
    );
   }

  DeleteDemandeurFormation(id1:number , id2:number ):Observable<DemandeurFormation>{
    const url = `${UrlApi}/${id1}/demandeurFormation/${id2}`;
    return this.http.delete<DemandeurFormation>(url).pipe(
    tap(_=>console.log(`DemandeurFormation supprimé  avec id= ${id2}`)),
    catchError(this.handleError<DemandeurFormation>(`deleteFormation id= ${id2}`))
     );
  }

  updateDemandeurFormation(id1:number , id2:number , id3:number , demandeurFormation ): Observable<any> {
    const url = `${UrlApi}/${id1}/demandeurFormation/${id2}/formation/${id3}`;
    return this.http.put(url, demandeurFormation, httpOptions).pipe(
      tap(_ => console.log(`DemandeurFormation modifié avec id =${id2}`)),
      catchError(this.handleError<any>('updateDemandeurFormation'))
    );
  }

  updateDemandeurFormationWithNoFormationId(id1:number , id2:number , demandeurFormation ): Observable<any> {
    const url = `${UrlApi}/${id1}/demandeurFormation/${id2}`;
    return this.http.put(url, demandeurFormation, httpOptions).pipe(
      tap(_ => console.log(`DemandeurFormation modifié avec id =${id2}`)),
      catchError(this.handleError<any>('updateDemandeurFormation'))
    );
  }

    /// DemandeEquivalence service ///

getDemandeEquivalencePagination(id:number , pageNumber = 0, pageSize = 2):Observable<any[]>{
   const url = `${UrlApi}/${id}/DemandeEquivalence?page=${pageNumber}&size=${pageSize}`;
  // console.log(`demandeEquivalence with id = ${id}`);
   return this.http.get<DemandeEquivalence[]>(url)
   .pipe(tap(DemandeEquivalence=>console.log(`demandeEquivalence with id =${id}`)),
   catchError(this.handleError('getDemandeEquivalencePaginé',[]))
   );
 }


addDemandeEquivalence(id:number , demandeEqui){
    console.log(` demandeur avec id=${id} `);
    const url = `${UrlApi}/${id}/DemandeEquivalence`;
    return this.http.post<DemandeEquivalence>(url,demandeEqui,httpOptions)
      .pipe(tap(_=> console.log(`demandeEquivalence ajouté avec id=${demandeEqui.id}`)),
      catchError(this.handleError<DemandeEquivalence>('addDemandeEquivalence'))
    );
}

updateDemandeEquivalence(id1:number , id2:number , demandeEqui): Observable<any> {
  const url = `${UrlApi}/${id1}/DemandeEquivalence/${id2}`;
  return this.http.put(url, demandeEqui, httpOptions).pipe(
    tap(_ => console.log(`DemandeEquivalence modifié avec demandeurid=${id1} , formationid=${id2}`)),
    catchError(this.handleError<any>('updateFormation'))
  );
}

deleteDemandeEquivalence(id1: number, id2: number) {
  const url = `${UrlApi}/${id1}/DemandeEquivalence/${id2}`;
  return this.http.delete<DemandeEquivalence>(url).pipe(
  tap(_=>console.log(`DemandeEquivalence retourné avec id1=${id1} et id2${id2}`)),
  catchError(this.handleError<DemandeEquivalence>(`deleteDemandeEquivalence id1=${id1} , id=${id2}`))
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
