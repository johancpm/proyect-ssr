import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { PokemonsDataView, PokemonData } from '../interfaces/index';
import { map, Observable, tap } from 'rxjs';
import { PokemonDataID } from '../interfaces/pokemon-id.data';



@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

private http = inject(HttpClient);
public idPoke = signal<string[]>([])

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
    tap( poke => {
      poke.map( ids => {
         this.idPoke.update(currentId => [...currentId, ids.id])
      })
    }),
    tap( resp => console.log(resp)),
  )
}

pokemongetById(id: string): Observable<PokemonDataID> {
  /* this.idPoke.update(currentId => [...currentId, id]) */
  return this.http.get<PokemonDataID>(`https://pokeapi.co/api/v2/pokemon/${id}`)
}

/* routerId (): string[] {
   for (let i = 1; i < 1026; i++) {
    const id = i.toString()
  this.idPoke.update(currentId => [...currentId, id])
   }

   return this.idPoke()
} */

}
