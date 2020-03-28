import { Injectable } from '@angular/core';
import { Jugador, Rol, Estado } from '../types';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, tap, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  jugadoresCollection: AngularFirestoreCollection<Jugador>;
  jugadores: Observable<Jugador[]>;

  constructor(private firestore: AngularFirestore) {
    this.jugadoresCollection = this.firestore.collection<Jugador>('jugadores');
    this.jugadores = this.jugadoresCollection.valueChanges({idField: 'id'});
  }

  getJugadores() {
    return this.jugadores;
  }

  filterRol(jugadores: Observable<Jugador[]>, rol: Rol) {
    return this.jugadores.pipe(
      map(jugadores => jugadores.filter(jugador => jugador.rol === rol))
    );
  }

  getLobos() {
    return this.filterRol(this.getJugadores(), Rol.lobo);
  }

  getAldeanos() {
    return this.filterRol(this.getJugadores(), Rol.aldeano);
  }

  kill(jugador: Jugador) {
    console.log(jugador.id)
    this.jugadoresCollection.doc(jugador.id).update({'estado': false});
  }

  resucitateAll() {
    this.getJugadores().pipe(first()).subscribe(jugadores => {
        jugadores.forEach(jugador => {
          this.jugadoresCollection.doc(jugador.id).update({'estado': true});
        });
      }
    );
  }

  OnVote(id){

  }
}
