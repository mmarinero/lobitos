import { Injectable } from '@angular/core';
import { Partida, Periodo } from '../types';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {
  private partidaID = 'x7aqxPUCZcE3ocFY6QnH'; // Cambiar esto por el buen ID de la partida
  public user;

  partidaDoc: AngularFirestoreDocument<Partida>;
  partida$: Observable<Partida>;
  partidaData: Partida;

  constructor(
    private firestore: AngularFirestore,
    ) {
    this.partidaDoc = this.firestore.doc<Partida>(`partida/${this.partidaID}`);
    this.partida$ = this.partidaDoc.valueChanges();
    this.partida$.subscribe(
      partida => {
        this.partidaData = partida;
      }
    );
  }

  setUser(user) {
    this.user = user;
  }

  siguienteTurno() {
    const dia = this.partidaData.periodo === 'noche' ? this.partidaData.dia + 1 : this.partidaData.dia;
    const periodo: Periodo = this.partidaData.periodo === 'noche' ? Periodo.dia : Periodo.noche;

    this.partidaDoc.set({dia, periodo}, { merge: true });
  }

}
