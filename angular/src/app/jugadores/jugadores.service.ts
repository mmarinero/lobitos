import { Injectable } from '@angular/core';
import { Jugador, Rol, Estado } from '../types';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  jugadores: AngularFirestoreCollection<Jugador>;

  constructor(private firestore: AngularFirestore) {
    this.jugadores = this.firestore.collection<Jugador>('jugadores');
    this.jugadores.add({
      nombre: 'payo', rol: Rol.aldeano, estado: Estado.muerto
    });
  }

  getJugadores() {
    return this.jugadores.valueChanges(['added', 'removed']);
  }
}
