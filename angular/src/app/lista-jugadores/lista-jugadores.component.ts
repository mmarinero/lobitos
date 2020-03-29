import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../jugadores/jugadores.service';
import { Observable } from 'rxjs';
import { Jugador, Rol, Estado } from '../types';
import { User } from '../models/user.model';

@Component({
  selector: 'app-lista-jugadores',
  templateUrl: './lista-jugadores.component.html',
  styleUrls: ['./lista-jugadores.component.scss']
})
export class ListaJugadoresComponent implements OnInit {

  usuarios$: Observable<User[]>;

  constructor(private jugadoresService: JugadoresService) { }

  ngOnInit() {
    this.usuarios$ = this.jugadoresService.getUsuarios();
  }

  getJugador(uid) {
    return this.jugadoresService.getJugador(uid);
  }

  addJugador(uid: string, rol: string) {
    this.jugadoresService.addJugador(uid, rol);
  }

  borrarJugador(uid: string) {
    this.jugadoresService.borrarJugador(uid);
  }
}
