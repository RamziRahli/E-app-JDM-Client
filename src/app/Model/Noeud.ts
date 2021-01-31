import { NoeudType } from './NoeudType';
import { Relation } from './Relation';

export class Noeud {

    id: number;
    nom: string;
    type: NoeudType;
    poids: number;
    motFormate: string;
    relations: Relation[];

    constructor(id: number,
        nom: string,
        type: NoeudType,
        poids: number,
        motFormate: string,
        relations: Relation[]) {
        this.nom = nom;
        this.id = id;
        this.type = type;
        this.poids = poids;
        this.motFormate = motFormate;
        this.relations = relations;
    }
}