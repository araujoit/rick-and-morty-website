import { Component, Inject, Input, OnInit } from '@angular/core';
import { RickandmortyService } from '../rickandmorty.service';
import { Character } from '../models';
import { MAT_DIALOG_DATA, MatDialog, MatDialogTitle, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  public characters: Character[] = [];
  public cacheCharacters: Character[] = [];

  public currentPage: number = 1;
  public totalPagesQuantity: number = 0;
  public disableFirstPage: boolean = false;
  public disableNextPage: boolean = false;
  public disablePageInput: boolean = false;
  public colunas: number = 1;
  public tamanhoLinha: string = "";

  private isFirstSearch: boolean = true;

  constructor(
      private service: RickandmortyService,
      private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.findAllCharacters();
    this.calculateColumns(window.innerWidth);
  }

  public findAllCharacters(page: number = 1) {
    let currentPageIsValid: boolean = !!page 
        && page > 0 
        && page <= this.totalPagesQuantity;

    if (this.isFirstSearch || currentPageIsValid) {
      this.isFirstSearch = false;
      this.service.findAllCharacters(page)
          .subscribe(value => {
            this.characters = value.results;
            this.cacheCharacters = value.results;
            this.totalPagesQuantity = value.info.pages;
            this.disableFirstPage = page <= 1;
            this.disableNextPage = page >= value.info.pages;
          });
    }
  }

  public prevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.findAllCharacters(this.currentPage);
    }
  }

  public nextPage() {
    this.currentPage += 1;
    this.findAllCharacters(this.currentPage);
  }

  public changePage(ev: Event) {
    let newPage = !!ev.target ? (ev.target as HTMLInputElement).value : undefined;
    if (!!newPage) {
      this.currentPage = +newPage;
    }
    
    this.findAllCharacters(+this.currentPage);
  }

  public changeColumns(ev: Event) {
    let newColumns = !!ev.target ? (ev.target as HTMLInputElement).value : undefined;
    if (!!newColumns) {
      this.colunas = +newColumns;
    }
  }

  private disablePageControls() {
    this.disableNextPage = false;
    this.disablePageInput = false;
    this.disableFirstPage = false;
  }

  private enablePageControls() {
    this.disableNextPage = true;
    this.disablePageInput = true;
    this.disableFirstPage = true;
  }

  public pesquisar(ev: Event) {
    let _pesquisa = !!ev.target ? (ev.target as HTMLInputElement).value : "";

    if (!_pesquisa) {
      this.characters = this.cacheCharacters;
      this.disablePageControls();
      return;
    }

    this.enablePageControls();

    let filtered = this.characters
      .filter(el => el.name.toLowerCase().indexOf(_pesquisa.toLowerCase()) > -1);
    this.characters = filtered;
  }

  public openDetails(character: Character) {
    this.dialog.open(CharacterDetailsComponent, {
      data: character
    });
  }

  public onResize(event: any) {
    this.calculateColumns(event.target.innerWidth);
  }

  private calculateColumns(width: number): void {

    if (width <= 800) {
      console.log("Menor ou igual a 800");
      this.colunas = 1;
      this.tamanhoLinha = "2:1.2";
      return;
    }

    if (width <= 1024) {
      console.log("Menor ou igual a 1024");
      this.colunas = 2;
      this.tamanhoLinha = "2:2.5";
      return;
    }

    if (width <= 1400) {
      console.log("Menor ou igual a 1400");
      this.colunas = 3;
      this.tamanhoLinha = "2:2.5";
      return;
    }

    if (width <= 1600) {
      console.log("Menor ou igual a 1600");
      this.colunas = 4;
      this.tamanhoLinha = "2:2.5";
      return;
    }

    console.log("Maior que 1600");
    this.colunas = 6;
    this.tamanhoLinha = "2:2.5";
  }
}

@Component({
  selector: 'app-character-details',
  templateUrl: './details/character-details.component.html',
  styleUrls: ['./details/character-details.component.scss']
})
export class CharacterDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Character) {}
  
  public extractEpisodeIdFromUrl(episode: string) {
    return episode.replace(`${RickandmortyService.HOST}/api/episode/`, "");
  }
}