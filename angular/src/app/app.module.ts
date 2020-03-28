import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './chat/chat.component';
import { PlazaComponent } from './plaza/plaza.component';
import { ListaJugadoresComponent } from './lista-jugadores/lista-jugadores.component';
import { MaterialAngularModule } from './material-angular.module';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    PlazaComponent,
    ListaJugadoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
