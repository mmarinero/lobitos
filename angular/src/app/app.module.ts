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
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { RegistrationComponent } from './pages/registration/registration.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/auth.service';
import { PartidaComponent } from './partida/partida.component';
import { ChatRoomsComponent } from './chat-rooms/chat-rooms.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    PlazaComponent,
    ListaJugadoresComponent,
    MessageComponent,
    TimeAgoPipe,
    RegistrationComponent,
    VerifyEmailComponent,
    LoginComponent,
    PartidaComponent,
    ChatRoomsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialAngularModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    AngularFireAuthModule,
  ],
  providers: [AngularFirestore, AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
