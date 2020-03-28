import { Injectable } from '@angular/core';
import { Message } from '../types';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messages: AngularFirestoreCollection<Message>;

  constructor(private firestore: AngularFirestore) {
    this.messages = this.firestore.collection<Message>('messages');
  }

  getMessages() {
    return this.messages.snapshotChanges().pipe(
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

    const messageA = a.timestamp.seconds;
    const messageB = b.timestamp.seconds;

    let comparison = 0;
    if (messageA > messageB) {
      comparison = 1;
    } else if (messageA < messageB) {
      comparison = -1;
    }
    return comparison;
  }

  sendMessage(message: Message) {
    console.log(message);
    this.messages.add(message);
  }
}
