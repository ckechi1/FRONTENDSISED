import { DemandeEquivalence } from '../demandeEquivalence/demandeEquivalence';

export interface Demandeur {
        id:number;
        nom:string;
        prenom:string;
        genre:string;
        nationalite:string;
        dateNaissance:Date;
        lieuNaissance:string;
        adresse:string;
        telephone:number;
        email:string;
        status:string;
        numeroPieceDidentite:number;
        demandeEquivalence : DemandeEquivalence  ;


 }
