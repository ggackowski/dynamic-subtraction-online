import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GameListComponent} from "./game-list/game-list/game-list.component";
import {InitUserComponent} from "./init/init-user/init-user.component";
import {LobbyComponent} from "./lobby/lobby/lobby.component";
import {GameComponent} from "./game/game/game.component";

const routes: Routes = [
  {
    path: '',
    component: InitUserComponent
  },
  {
    path: 'games',
    component: GameListComponent
  },
  {
    path: 'lobby',
    component: LobbyComponent
  },
  {
    path: 'game',
    component: GameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
