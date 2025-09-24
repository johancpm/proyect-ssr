import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListLoadingComponent } from './pokemon-list-loading.component';

describe('PokemonListLoadingComponent', () => {
  let component: PokemonListLoadingComponent;
  let fixture: ComponentFixture<PokemonListLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonListLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
