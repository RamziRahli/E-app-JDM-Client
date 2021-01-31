import { Noeud } from './Noeud';
import { Relation } from './Relation';
import { NoeudType } from './NoeudType'
import { lstat } from 'fs';

export class Mot extends Noeud {


    definition: string[];
    Noeuds: Noeud[];
    relationEntrantes: Relation[];
    relationSortantes: Relation[];

    mapEntrantes: Map<string, Relation[]>;
    mapEntrantesNames: string[];

    mapSortantes: Map<string, Relation[]>;
    mapSortantesNames: string[];

    rafDefinitions: string[];

    constructor(id: number,
        nom: string,
        type: NoeudType,
        poids: number,
        motFormate: string,
        relations: Relation[],
        definition: string[],
        Noeuds: Noeud[],
        relationEntrantes: Relation[],
        relationSortantes: Relation[],
        mapEntrantes: Map<string, Relation[]>,
        mapSortantes: Map<string, Relation[]>,
        rafDefinitions: string[]
    ) {
        super(id, nom, type, poids, motFormate, relations);

        this.definition = definition;
        this.Noeuds = Noeuds;
        this.relationEntrantes = relationEntrantes;
        this.relationSortantes = relationSortantes;
        this.mapEntrantes = mapEntrantes;
        this.mapSortantes = mapSortantes;
        this.rafDefinitions = rafDefinitions;

        this.mapEntrantesNames = [];
        this.mapSortantesNames = [];

    }

}
