import { Injectable } from '@angular/core';
import { Partida } from '../types';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {
  private partidaID = 'x7aqxPUCZcE3ocFY6QnH'; // Cambiar esto por el buen ID de la partida

  private partidaDoc: AngularFirestoreDocument<Partida>;
  partida$: Observable<Partida>;
  partidaData: Partida;

  constructor(private firestore: AngularFirestore) {
    this.partidaDoc = this.firestore.doc<Partida>(`partida/${this.partidaID}`);
    this.partida$ = this.partidaDoc.valueChanges();
    this.partida$.subscribe(
      partida => {
        this.partidaData = partida;
      }
    );
  }

  siguienteTurno() {
    const dia = this.partidaData.periodo === 'noche' ? this.partidaData.dia + 1 : this.partidaData.dia;
    const periodo = this.partidaData.periodo === 'noche' ? 'dia' : 'noche';

    this.partidaDoc.set({dia, periodo}, { merge: true });
  }



}
