import { Injectable } from '@angular/core';
import { Jugador, Rol, Estado } from '../types';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  jugadores: AngularFirestoreCollection<Jugador>;

  constructor(private firestore: AngularFirestore) {
    this.jugadores = this.firestore.collection<Jugador>('jugadores');
  }

  getJugadores() {
    return this.jugadores.valueChanges(['added', 'removed']);
  }

  filterRol(jugadores: Observable<Jugador[]>, rol: Rol) {
    return this.jugadores.valueChanges(['added', 'removed']).pipe(
      map(jugadores => jugadores.filter(jugador => jugador.rol === rol))
    );
  }

  getLobos() {
    return this.filterRol(this.getJugadores(), Rol.lobo);
  }

  getAldeanos() {
    return this.filterRol(this.getJugadores(), Rol.aldeano);
  }
}
