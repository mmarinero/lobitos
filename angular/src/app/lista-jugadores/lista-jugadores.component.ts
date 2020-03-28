import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../jugadores/jugadores.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Jugador } from '../types';

@Component({
  selector: 'app-lista-jugadores',
  templateUrl: './lista-jugadores.component.html',
  styleUrls: ['./lista-jugadores.component.scss']
})
export class ListaJugadoresComponent implements OnInit {

  jugadores: Observable<Jugador[]>

  constructor(private jugadoresService: JugadoresService) { }

  ngOnInit() {
    this.jugadores = this.jugadoresService.getLobos().pipe(
      tap((wat) => {console.log(wat)})
    );
  }

}
