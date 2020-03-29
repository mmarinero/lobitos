import { Component, OnInit, Input } from '@angular/core';
import { JugadoresService } from '../jugadores/jugadores.service';
import { Rol } from '../types';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.scss']
})
export class ChatRoomsComponent {
  panelOpenState = false;
  loboRol = false;

  user: any;

  constructor(private jugadoresService: JugadoresService) {
    this.jugadoresService.getMiJugador$().subscribe(jugador => {
      this.user = jugador;
      this.loboRol = jugador && jugador.rol === Rol.lobo;
    });
  }
}
