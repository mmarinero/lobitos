import { Injectable } from '@angular/core';
import { Voto } from '../types';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class VotacionAldeanosService {

  votacion_aldeanos: AngularFirestoreCollection<Voto>;

  constructor(private firestore: AngularFirestore) {
    this.votacion_aldeanos = this.firestore.collection<Voto>('votacion_aldeanos');
  }

  getVotacions() {
    return this.votacion_aldeanos.valueChanges(['added', 'removed']);
  }
}

