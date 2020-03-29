import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../jugadores/jugadores.service';
import { Observable } from 'rxjs';
import { Jugador, Rol, Estado } from '../types';

@Component({
  selector: 'app-lista-jugadores',
  templateUrl: './lista-jugadores.component.html',
  styleUrls: ['./lista-jugadores.component.scss']
})
export class ListaJugadoresComponent implements OnInit {

  jugadores: Observable<Jugador[]>;

  constructor(private jugadoresService: JugadoresService) { }

  ngOnInit() {
    this.jugadores = this.jugadoresService.getJugadores();
  }

  addJugador() {
    // FIXME: Remplazar con el ID del jugador cuando tengamos autentificación
    const jugador = {
      nombre: 'Test',
      rol: Rol.aldeano,
      estado: Estado.vivo,
    };
    this.jugadoresService.addJugador(jugador);
  }
}
