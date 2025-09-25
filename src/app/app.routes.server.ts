import { RenderMode, ServerRoute } from '@angular/ssr';
import { PokemonsService } from './pokemons/services/pokemons.service';
import { inject } from '@angular/core';



export const serverRoutes: ServerRoute[] = [

  {
    path: 'pokeminfo/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
       const serviceId = inject(PokemonsService)
       const ids =  serviceId.routerId();
       return ids.map(id => ({id}));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
