import { Noeud } from './Noeud';
import { RelationType } from './RelationType';

export class Relation {

    idRelation : number;
    noeud : Noeud;
    type : RelationType;
    poids : number;
}