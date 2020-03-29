import { Injectable } from '@angular/core';
import { Jugador, Rol, Estado } from '../types';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'firebase/firestore';

import { PartidaService } from '../partida/partida.service';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  jugadoresCollection: AngularFirestoreCollection<Jugador>;
  jugadores$: Observable<Jugador[]>;

  constructor(
    private firestore: AngularFirestore,
    private partidaService: PartidaService
    ) {
    this.jugadoresCollection = this.partidaService.partidaDoc.collection<Jugador>('jugadores');
    this.jugadores$ = this.jugadoresCollection.valueChanges({idField: 'id'});
  }

  addJugador(jugador: Jugador) {
    // FIXME: Recuperar datos reales del usuario a partir del ID
    const id = this.firestore.createId();
    const jugadorData = {
      ...jugador,
      id,
    };
    this.jugadoresCollection.doc(id).set(jugadorData);
  }

  getJugadores() {
    return this.jugadores$;
  }

  filterRol(rol: Rol) {
    return this.jugadores$.pipe(
      map(jugadores => jugadores.filter(jugador => jugador.rol === rol))
    );
  }

  getLobos() {
    return this.filterRol(Rol.lobo);
  }

  getAldeanos() {
    return this.filterRol(Rol.aldeano);
  }

  kill(jugadorId) {
    console.log(`matando a ${jugadorId}`);
    this.jugadoresCollection.doc(jugadorId).update({estado: false});
  }

  resucitateAll() {
    this.getJugadores().pipe(first()).subscribe(jugadores => {
        jugadores.forEach(jugador => {
          this.jugadoresCollection.doc(jugador.id).update({estado: true});
        });
      }
    );
  }

  OnVote(id) {

  }
}
