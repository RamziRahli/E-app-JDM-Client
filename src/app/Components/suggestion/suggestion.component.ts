import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from 'src/app/Service/service.service';
import { Mot } from 'src/app/Model/Mot';
import { Relation } from 'src/app/Model/Relation';
import { Key } from 'protractor';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var $: any;

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {
  order: string = 'poids';
  order_entrantes: string = 'poids';
  reverse: boolean = true;
  reverse_entrantes: boolean = true;
  history: Array<string> = [];
  suggestion: Array<string> = [];


  @Input() message: string;
  @Input() no_relout: boolean;
  @Input() no_relin: boolean;
  @Input() relation: string = "";

  res: Mot;

  page = 1;
  pageSize = 4;

  pageref = 1;
  pageSizeref = 4;

  pages = {};
  pagesSortantes = {};

  SortEmpty: any;
  EnterEmpty: any = null;

  e: any;

  @Output() messageEvent = new EventEmitter<string>();

  constructor(private httpClient: HttpClient, private apiWord: ServiceService, private ngxLoader: NgxUiLoaderService) { }

  sendMessage(mot: string) {
    this.messageEvent.emit(mot)
  }

  ngOnInit() {

  }

  oncollapse(e: any) {

    $("#accordionExamples").on("show.bs.collapse", e => {
      $(e.target)
        .prev()
        .find("i:last-child")
        .removeClass("fa-plus")
        .addClass("fa-minus")
    });

    $("#accordionExamples").on("hide.bs.collapse", e => {
      $(e.target)
        .prev()
        .find("i:last-child")
        .removeClass("fa-minus")
        .addClass("fa-plus")
    });
  }

  oncollapse2(e: any) {
    $("#accordionExamples2").on("show.bs.collapse", e => {
      $(e.target)
        .prev()
        .find("i:last-child")
        .removeClass("fa-plus")
        .addClass("fa-minus")
    });

    $("#accordionExamples2").on("hide.bs.collapse", e => {
      $(e.target)
        .prev()
        .find("i:last-child")
        .removeClass("fa-minus")
        .addClass("fa-plus")
    });
  }

  Search(message, relation) {
    this.suggestion = [];
    console.log('debut')
    console.log(this.suggestion)
    console.log('fin')

    if (!this.history.some(x => x === message)) {
      this.history.unshift(this.message);
      localStorage.setItem('history', JSON.stringify(this.history));
    }

    this.ngxLoader.startLoader('loader-01');

    this.apiWord.getMot(message, relation).subscribe((res: Mot) => {
      if (res !== null) {
        this.res = res;

        if (this.res.mapEntrantes == null || this.res.mapEntrantes == undefined) {
          this.EnterEmpty = null;
        } else {
          this.res.mapEntrantesNames = Object.keys(this.res.mapEntrantes);
          for (var e of this.res.mapEntrantesNames) {
            this.pages[e] = 1;
          }
          this.EnterEmpty = Object.keys(this.res.mapEntrantes);
          if (!this.suggestion.some(x => x === this.res.mapSortantes['r_has_part'][0].noeud.nom)) {
            this.suggestion.unshift(this.res.mapSortantes['r_has_part'][0].noeud.nom);
            localStorage.setItem('suggestion', JSON.stringify(this.suggestion));
          }
          if (!this.suggestion.some(x => x === this.res.mapSortantes['r_has_part'][1].noeud.nom)) {
            this.suggestion.unshift(this.res.mapSortantes['r_has_part'][1].noeud.nom);
            localStorage.setItem('suggestion', JSON.stringify(this.suggestion));
          }
          if (!this.suggestion.some(x => x === this.res.mapSortantes['r_syn'][1].noeud.nom)) {
            this.suggestion.unshift(this.res.mapSortantes['r_syn'][1].noeud.nom);
            localStorage.setItem('suggestion', JSON.stringify(this.suggestion));
          }
          if (!this.suggestion.some(x => x === this.res.mapSortantes['r_syn'][0].noeud.nom)) {
            this.suggestion.unshift(this.res.mapSortantes['r_syn'][0].noeud.nom);
            localStorage.setItem('suggestion', JSON.stringify(this.suggestion));
          }
          if (!this.suggestion.some(x => x === this.res.mapSortantes['r_agent'][0].noeud.nom)) {
            this.suggestion.unshift(this.res.mapSortantes['r_agent'][0].noeud.nom);
            localStorage.setItem('suggestion', JSON.stringify(this.suggestion));
          }
          if (!this.suggestion.some(x => x === this.res.mapSortantes['r_patient'][0].noeud.nom)) {
            this.suggestion.unshift(this.res.mapSortantes['r_patient'][0].noeud.nom);
            localStorage.setItem('suggestion', JSON.stringify(this.suggestion));
          }
          if (!this.suggestion.some(x => x === this.res.mapSortantes['r_family'][0].noeud.nom)) {
            this.suggestion.unshift(this.res.mapSortantes['r_family'][0].noeud.nom);
            localStorage.setItem('suggestion', JSON.stringify(this.suggestion));
          }
          if (!this.suggestion.some(x => x === this.res.mapSortantes['r_lieu'][0].noeud.nom)) {
            this.suggestion.unshift(this.res.mapSortantes['r_lieu'][0].noeud.nom);
            localStorage.setItem('suggestion', JSON.stringify(this.suggestion));
          }
        }
        if (this.res.mapSortantes == null || this.res.mapSortantes == undefined) {
          this.SortEmpty = null;
        } else {
          this.res.mapSortantesNames = Object.keys(this.res.mapSortantes);
          for (var a of this.res.mapSortantesNames) {
            this.pagesSortantes[a] = 1;
          }
          this.SortEmpty = Object.keys(this.res.mapSortantes);
        }
        this.ngxLoader.stopLoader('loader-01');

      } else {
        this.ngxLoader.stopLoader('loader-01');
        this.res = null;
        $('#errorserver').removeClass("invisible").addClass("visible");
      }
    });

  }

  ngOnChanges(changes: SimpleChanges) {

    //this.relation = changes['relation'].currentValue;

    if (changes['message'] !== undefined) {
      this.message = changes['message'].currentValue;
      this.Search(this.message, this.relation);
    }


    if (changes['relation'] !== undefined && changes['message'] == undefined) {
      this.relation = changes['relation'].currentValue;
      this.Search(this.message, this.relation);
    }

  }

  setOrder(value: string, is_out: any) {

    if (is_out) {
      if (this.order === value) {
        this.reverse = !this.reverse;
      }
      this.order = value;
    } else {
      if (this.order_entrantes === value) {
        this.reverse_entrantes = !this.reverse_entrantes;
      }
      this.order_entrantes = value;
    }
  }

  NewSearch(mot: string) {
    this.message = mot;
    $('.collapse').removeClass("show");
    $('.fa-stack-1x.fa-inverse').removeClass("fa-minus").addClass("fa-plus");
    $('#errorserver').removeClass("visible").addClass("invisible");
    this.sendMessage(mot);
  }

}
