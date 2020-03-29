import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../jugadores/jugadores.service';
import { VotacionAldeanosService } from '../votacion/votacion.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Jugador, Rol, Estado } from '../types';
import { Voto } from '../types';

@Component({
  selector: 'app-lista-jugadores',
  templateUrl: './lista-jugadores.component.html',
  styleUrls: ['./lista-jugadores.component.scss']
})
export class ListaJugadoresComponent implements OnInit {

  jugadores: Observable<Jugador[]>;
  votacion_aldeanos: Observable<Voto[]>;
  jugadores_l: Jugador[];
  votacion_aldeanos_l: Voto[];

  constructor(private jugadoresService: JugadoresService, private votacionAldeanosService: VotacionAldeanosService) { }

  ngOnInit() {
    this.jugadores = this.jugadoresService.getJugadores();
    this.votacion_aldeanos = this.votacionAldeanosService.getVotacions();

    this.jugadores.forEach(jugadores => {
      jugadores.forEach(jugador => {
        this.votacion_aldeanos.forEach(votacion_aldeanos => {
          votacion_aldeanos.forEach(votacion_aldeano => {
            // console.log('votacion', votacion_aldeano.nominado);
          });
        });
        // console.log('jugador', jugador);
      });
    });
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
