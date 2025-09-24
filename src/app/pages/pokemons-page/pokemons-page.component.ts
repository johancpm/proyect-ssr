import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListLoadingComponent } from "./ui/pokemon-list-loading/pokemon-list-loading.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { PokemonData } from '../../pokemons/interfaces';
import { map, tap } from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop'
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-pokemons-page',
  imports: [PokemonListComponent, PokemonListLoadingComponent],
  templateUrl: './pokemons-page.component.html',

})
export default class PokemonsPageComponent  {

  private servicePokemon = inject(PokemonsService)
  private router = inject(ActivatedRoute)
  private routers = inject(Router)
  private title = inject(Title)
  public pokemons = signal<PokemonData[]>([])

  public currenPage = toSignal<number>(
    this.router.queryParamMap.pipe(
      map(paramns => paramns.get('par') ?? 1),
      map(page => isNaN(+page) ? 1 : page),
      map(page => Math.max(1, +page))
    )

  )



  ngOnInit(): void {
   /* console.log(this.currenPage()); */


     this.loadPokemonts()
  }

  loadPokemonts (page = 0) {
  const pageToLoad = this.currenPage()! + page

    this.servicePokemon.getPokemons(pageToLoad)
     .pipe(
       tap( resp => {
        this.pokemons.set(resp)
        this.routers.navigate([], {queryParams: {par: pageToLoad}})
        this.title.setTitle(`pokemon-ssr-page-${pageToLoad}`)
      })
     )
     .subscribe()
  }


}
