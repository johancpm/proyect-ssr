import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { PokemonDataID } from '../../pokemons/interfaces/pokemon-id.data';
import { Title, Meta } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-pokemon-page',
  imports: [TitleCasePipe],
  templateUrl: './pokemon-page.component.html',

})
export default class PokemonPageComponent implements OnInit {
 /* inyecciones Propias */
  private pokemonService = inject(PokemonsService)
 /* inyecciones sumistradas */
  private activeRouter = inject(ActivatedRoute)
  private meta = inject(Meta)
  private title = inject(Title)

  public pokemon = signal<PokemonDataID | null>(null)



ngOnInit(): void {
   const id = this.activeRouter.snapshot.paramMap.get('id')
   if(!id) return;
    this.pokemonService.pokemongetById(id)
    .pipe(
      tap(({name, id}) => {
         const pageTitle = `#${id} - ${name}`
         const descrip = `Pagina del pokemon ${name}`
         this.title.setTitle(pageTitle);

         this.meta.updateTag({
          name: 'description',
          content: descrip
         });
         this.meta.updateTag({
          name: 'og:title',
          content: pageTitle
         });
         this.meta.updateTag({
          name: 'og:description',
          content: descrip
         });
         this.meta.updateTag({
          name: 'og:image',
          content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
         });
      })
    )
    .subscribe(this.pokemon.set)
  }



}
