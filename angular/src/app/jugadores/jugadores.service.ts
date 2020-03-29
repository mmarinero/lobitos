import { Injectable } from '@angular/core';
import { Jugador, Rol, Estado } from '../types';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'firebase/firestore';

import { PartidaService } from '../partida/partida.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  private jugadoresCollection: AngularFirestoreCollection<Jugador>;
  private jugadores$: Observable<Jugador[]>;

  private usuariosCollection: AngularFirestoreCollection<User>;
  private usuarios$: Observable<User[]>;

  constructor(
    private firestore: AngularFirestore,
    private partidaService: PartidaService
    ) {
    this.jugadoresCollection = this.partidaService.partidaDoc.collection<Jugador>('jugadores');
    this.jugadores$ = this.jugadoresCollection.valueChanges();
    this.usuariosCollection = this.firestore.collection<User>('users');
    this.usuarios$ = this.usuariosCollection.valueChanges();
  }

  async addJugador(uid: string, rol: string) {
    const jugadores = await this.jugadoresCollection.ref.get();
    const usuarios = await this.usuariosCollection.ref.get();
    let jugador = null;
    jugadores.forEach(jugadorRef => {
      let j = jugadorRef.data();
      if(j.id === uid) jugador = j;
    });
    let usuario: User = null;
    usuarios.forEach(userRef => {
      let u = userRef.data() as User;
      if(u.uid === uid) usuario = u
    });
    if (!jugador) {
      const id = this.firestore.createId();
      const jugadorData: Jugador = {
        id: uid,
        rol: rol as Rol,
        estado: Estado.vivo,
        nombre: usuario.displayName
      };
      this.jugadoresCollection.doc(id).set(jugadorData);
    }
  }

  getJugadores() {
    return this.jugadores$;
  }

  getUsuarios() {
    return this.usuarios$
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
