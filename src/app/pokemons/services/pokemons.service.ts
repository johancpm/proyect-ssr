import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokemonsDataView, PokemonData } from '../interfaces/index';
import { map, Observable, tap } from 'rxjs';
import { PokemonDataID } from '../interfaces/pokemon-id.data';


@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

private http = inject(HttpClient);

getPokemons (page: number): Observable<PokemonData[]> {
   if(page != 0){
      --page
   }

  page = Math.max(0, page);

  return this.http.get<PokemonsDataView>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`)
  .pipe(
    map( resp => {
        const simplePokemons:PokemonData[] = resp.results.map( pokemon => ({
           id: pokemon.url.split('/').at(-2) ?? '',
           name: pokemon.name

        }))
        return simplePokemons;
    }),
    tap( resp => console.log(resp)),
  )
}

pokemongetById(id: string): Observable<PokemonDataID> {

  return this.http.get<PokemonDataID>(`https://pokeapi.co/api/v2/pokemon/${id}`)
}

}
