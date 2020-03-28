import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-jugadores',
  templateUrl: './lista-jugadores.component.html',
  styleUrls: ['./lista-jugadores.component.scss']
})

export class ListaJugadoresComponent 
implements OnInit {

  players = [
	  new Player(1, 'Windstorm', true, 'H'),
	  new Player(2, 'Bombasto', false, 'H'),
	  new Player(3, 'Magneta', true, 'W'),
	  new Player(4, 'Tornado', true, 'H')
	];

  constructor() {}

  ngOnInit() {
  }

  openInfo(player) {
    const infoPlayer = this.dialog.open(ListaJugadoresComponent, {
      width: '250px',
      data: { player: player}
    });
  }

  OnVote(id) {
    alert(id);
  }
}

export class Player {
  id: number;
  name: string;
  alive: bool;
  aliveSince: number;
  role: string;

  constructor(
    public id: number,
    public name: string,
    public alive: bool,
    public aliveSince: number,
    private role: string) {

    }
}
