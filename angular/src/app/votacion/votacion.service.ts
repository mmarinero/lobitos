import { Injectable } from '@angular/core';
import { Voto } from '../types';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';
import { PartidaService } from '../partida/partida.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotacionAldeanosService {

  private votacionAldeanos: AngularFirestoreCollection<Voto>;
  votosAldeanos$: Observable<Voto[]>;
  private votacionLobos: AngularFirestoreCollection<Voto>;
  votosLobos$: Observable<Voto[]>;

  constructor(
    private partidaService: PartidaService
    ) {
    this.votacionAldeanos = this.partidaService.partidaDoc.collection<Voto>('votacion_aldeanos');
    this.votosAldeanos$ = this.votacionAldeanos.valueChanges();

    this.votacionLobos = this.partidaService.partidaDoc.collection<Voto>('votacion_lobos');
    this.votosLobos$ = this.votacionLobos.valueChanges();
  }

  addVotoAldeano(voto: Voto) {
    this.votacionAldeanos.add(voto);
  }

  addVotoLobo(voto: Voto) {
    console.log('yo vote a kodos')
    this.votacionLobos.add(voto);
  }

  async limpiarVotosAldeanos() {
    const qry: firebase.firestore.QuerySnapshot = await this.votacionAldeanos.ref.get();
    qry.forEach(doc => {
      doc.ref.delete();
    });
  }

  async limpiarVotosLobos() {
    const qry: firebase.firestore.QuerySnapshot = await this.votacionLobos.ref.get();
    qry.forEach(doc => {
      doc.ref.delete();
    });
  }

}

