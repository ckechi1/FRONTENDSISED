import { Demandeur } from '../demandeur/demandeur';
import { Formation } from '../formation/formation';

export interface DemandeurFormation {

   id : number ;
   mention : string ;
   promotion : string ;
   pays : string ;
   etablissement  : string ;
   dateObtention : Date ;
   formation: Formation;
   demandeur: Demandeur;

}
