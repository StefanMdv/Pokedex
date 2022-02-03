import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-pokomon-details',
  templateUrl: './pokomon-details.component.html',
  styleUrls: ['./pokomon-details.component.scss']
})
export class PokomonDetailsComponent implements OnInit {
  public pokemon :any; 
  public index : number ;
  public typeColors: any;
  health : number;
  attack : number;
  defence : number;
  speed: number;

  constructor(public dialogRef:MatDialogRef<PokomonDetailsComponent>) { }

  ngOnInit(): void {
    this.getTheColor();
    this.getAttributes();
  }

  getPokemonID(index) {          
    if(index<100 && index>9){
      index="0" + index;
    } else {
      if(index >99){
        index =index;
      } else {
        index = "00"+ index;
      }
    }
    return index;
    
}
getTheColor() {
  for(let i=0; i<this.typeColors.length; i++){
    if(this.pokemon.types[0].type.name == this.typeColors[i].type){
      document.getElementById('pokedex').style.backgroundColor = this.typeColors[i].color;
      console.log('color changed');
    }
  }
}

progressBarColor(progress:number) {
  if (progress<31){
    return 'warn';
 } else if (progress>79){
    return 'accent';
 } else {
   return 'primary';
 }
}

getAttributes() {
  this.health = this.pokemon.stats[0].base_stat;
  this.attack = this.pokemon.stats[1].base_stat;
  this.defence = this.pokemon.stats[2].base_stat;
  this.speed = this.pokemon.stats[5].base_stat;
}

closeDialog(){
  this.dialogRef.close();
}
}

