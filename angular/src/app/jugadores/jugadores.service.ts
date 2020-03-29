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

  async getJugador(uid: string): Promise<Jugador> {
    const jugadores = await this.jugadoresCollection.ref.get();
    let jugador = null;
    jugadores.forEach(jugadorRef => {
      let j = jugadorRef.data();
      if(j.uid === uid) jugador = j;
    });
    return jugador;
  }

  async getUsuario(uid: string): Promise<User> {
    const usuarios = await this.usuariosCollection.ref.get();
    let usuario = null;
    usuarios.forEach(usuariosRef => {
      let u = usuariosRef.data();
      if(u.uid === uid) usuario = u;
    });
    return usuario;
  }


  async addJugador(uid: string, rol: string) {
    const jugador = await this.getJugador(uid);
    const usuario = await this.getUsuario(uid);
    if (!jugador) {
      const id = this.firestore.createId();
      const jugadorData: Jugador = {
        id: id,
        uid: uid,
        rol: rol as Rol,
        estado: Estado.vivo,
        nombre: usuario.displayName
      };
      this.jugadoresCollection.doc(id).set(jugadorData);
    } else {
      this.jugadoresCollection.doc(jugador.id).update({estado: Estado.vivo, rol: rol})
    }
  }

  async borrarJugador(uid: string) {
    const jugador = await this.getJugador(uid);
    if (jugador) {
      this.jugadoresCollection.doc(jugador.id).delete()
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
