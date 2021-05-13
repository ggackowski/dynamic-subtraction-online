import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitUserComponent } from './init/init-user/init-user.component';
import {FormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import { GameListComponent } from './game-list/game-list/game-list.component';
import { CreateGameComponent } from './game-list/create-game/create-game.component';
import { LobbyComponent } from './lobby/lobby/lobby.component';
import { GameComponent } from './game/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    InitUserComponent,
    GameListComponent,
    CreateGameComponent,
    LobbyComponent,
    GameComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase)
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
