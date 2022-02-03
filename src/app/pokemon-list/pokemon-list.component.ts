import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { PokomonDetailsComponent } from '../pokomon-details/pokomon-details.component';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons = [];
  value: string;
  page = 1;
  totalPokemons: number;
  loaded = 12;
  pokemonsPerLoad = 12;
  filterdPokemons = this.pokemons;
  typeColors = [
    {
      "type": "grass",
      "color": "#7fd530d1"
    },
    {
      "type": "fire",
      "color": "#e73820c7"
    },
    {
      "type": "water",
      "color": "#8ae9ffd9"
    },
    {
      "type": "bug",
      "color": "#468366a6"
    },
    {
      "type": "normal",
      "color": "#c3cacd59"
    },
    {
      "type": "poison",
      "color": "#937ce99c"
    },
    {
      "type": "electric",
      "color": "#ffe100"
    },
    {
      "type": "ground",
      "color": "#dcc200d6"
    },
    {
      "type": "fairy",
      "color": "#f9dad9b3"
    },
    {
      "type": "fighting",
      "color": "#a3611c61"
    },
    {
      "type": "psychic",
      "color": "#ee848c94"
    },
    {
      "type": "rock",
      "color": "#88878080"
    },
    {
      "type": "ghost",
      "color": "#664497a6"
    },
    {
      "type": "ice",
      "color": "#84cdf7c9"
    },
    {
      "type": "dragon",
      "color": "#f9be00d6"
    }
  ];



  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPokemons();
  }
  getPokemons() {
    this.dataService.getPokemons(12, this.page + 0)
      .subscribe((response: any) => {
        this.totalPokemons = response.count;

        response.results.forEach(result => {
          this.dataService.getMoreData(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              console.log(this.pokemons);
            });
        });
      });
  }

  nextPokemons() {
    this.dataService.getPokemons(this.pokemonsPerLoad, this.loaded)
      .subscribe((response: any) => {
        this.totalPokemons = response.count;

        response.results.forEach(result => {
          this.dataService.getMoreData(result.name)
            .subscribe((uniqResponse: any) => {
              this.pokemons.push(uniqResponse);
              console.log(this.pokemons);
            });
        });
      });

    this.loaded = this.loaded + this.pokemonsPerLoad;

  }

  openDialog(pokemon, index, typeColors) {
    const dialog = this.dialog.open(PokomonDetailsComponent);
    dialog.componentInstance.pokemon = pokemon;
    dialog.componentInstance.index = index;
    dialog.componentInstance.typeColors = typeColors;
  }

  getPokemonID(index) {
    if (index < 100 && index > 9) {
      index = "0" + index;
    } else {
      if (index > 99) {
        index = index;
      } else {
        index = "00" + index;
      }
    }
    return index;

  }

  getBackgroundColorByType(type: string) {
    let find = this.typeColors.find(t => t.type == type);
    return find.color;
  }

  handleSearch(input: any) {
    console.log(input.value);

    this.filterdPokemons = this.pokemons.filter(p => p.name.startsWith(input.value.toLowerCase()));


  }

}
