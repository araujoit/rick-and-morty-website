import { Injectable } from '@angular/core';
import { Character } from './models';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {

  public static HOST: string = "https://rickandmortyapi.com";

  constructor(private http: HttpClient) { }

  findAllCharacters(page: number = 1): Observable<CharactersResponse> {
    return this.http.get<CharactersResponse>(`${RickandmortyService.HOST}/api/character?page=${page}`);
  }
}

export interface CharactersResponse {
  info: InfoResponse;
  results: Character[];
}

export interface InfoResponse {
  count: number;
  pages: number;
  next: string;
  prev: string;
}
