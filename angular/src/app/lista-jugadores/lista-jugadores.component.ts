import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../jugadores/jugadores.service';
import { VotacionAldeanosService } from '../votacion/votacion.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Jugador } from '../types';
import { Voto } from '../types';

@Component({
  selector: 'app-lista-jugadores',
  templateUrl: './lista-jugadores.component.html',
  styleUrls: ['./lista-jugadores.component.scss']
})
export class ListaJugadoresComponent implements OnInit {

  jugadores: Observable<Jugador[]>;
  votacion_aldeanos: Observable<Voto[]>;

  constructor(private jugadoresService: JugadoresService, private votacionAldeanosService: VotacionAldeanosService) { }

  ngOnInit() {
    this.jugadores = this.jugadoresService.getJugadores().pipe(
      tap((wat) => {console.log(wat)})
    );
    this.votacion_aldeanos = this.votacionAldeanosService.getVotacions().pipe(
      tap((wat) => {console.log(wat)})
    );
  }
}
