import { Injectable } from '@angular/core';
import { Message } from '../types';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { PartidaService } from '../partida/partida.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  humanMessages: AngularFirestoreCollection<Message>;
  wolfMessages: AngularFirestoreCollection<Message>;

  constructor(private partidaService: PartidaService,
              private firestore: AngularFirestore) {
    this.humanMessages = this.partidaService.partidaDoc.collection<Message>('chat_aldeanos');
    this.wolfMessages = this.partidaService.partidaDoc.collection<Message>('chat_lobos');
  }

  getHumanMessages() {
    return this.humanMessages.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Message;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
      map(messages => {
        return messages.sort(this.compareMessages);
      })
    );
  }

  getWolfMessages() {
    return this.wolfMessages.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Message;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
      map(messages => {
        return messages.sort(this.compareMessages);
      })
    );
  }

  compareMessages(a, b) {

    const messageA = a.date;
    const messageB = b.date;

    let comparison = 0;
    if (messageA > messageB) {
      comparison = 1;
    } else if (messageA < messageB) {
      comparison = -1;
    }
    return comparison;
  }

  sendHumanMessage(message: Message) {
    console.log(message);
    this.humanMessages.add(message);
  }

  sendWolfMessage(message: Message) {
    console.log(message);
    this.wolfMessages.add(message);
  }
}
