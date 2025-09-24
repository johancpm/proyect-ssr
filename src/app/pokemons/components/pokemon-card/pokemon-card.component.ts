import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { PokemonData } from '../../interfaces';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.component.html',

})
export class PokemonCardComponent  {

  public pokemon = input.required<PokemonData>()
  public pokemonImg = computed( () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`
  )



}
