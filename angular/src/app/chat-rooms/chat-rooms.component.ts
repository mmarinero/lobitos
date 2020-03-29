import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../jugadores/jugadores.service';
import { Rol } from '../types';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.scss']
})
export class ChatRoomsComponent implements OnInit {
  panelOpenState = false;
  loboRol = false;

  constructor(private jugadoresService: JugadoresService) {
    this.jugadoresService.getMiJugador$().subscribe(jugador => {
      this.loboRol = jugador && jugador.rol === Rol.lobo
    })
  }

  ngOnInit() {
  }

}
