import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { PokemonData } from '../../interfaces';
import { PokemonsService } from '../../services/pokemons.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
})
export class PokemonListComponent  {
    public pokemonsList = input.required<PokemonData[]>()




}
