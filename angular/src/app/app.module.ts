import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './chat/chat.component';
import { PlazaComponent } from './plaza/plaza.component';
import { ListaJugadoresComponent } from './lista-jugadores/lista-jugadores.component';
import { MaterialAngularModule } from './material-angular.module';
import { environment } from 'src/environments/environment';
import { MessageComponent } from './message/message.component';
import { FormsModule } from '@angular/forms';
import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    PlazaComponent,
    ListaJugadoresComponent,
    MessageComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialAngularModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
