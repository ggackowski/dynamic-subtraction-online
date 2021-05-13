import {Component, OnDestroy, OnInit} from '@angular/core';
import {PendingGame, PendingGameWithId} from "../../model/pending-game.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {ActiveGame} from "../../model/active-game.model";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit, OnDestroy {
  public games: Array<PendingGameWithId> = [];
  public loaded = false;
  public gameCreationInProgress = false;
  public sub = new Subscription();

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.sub.add(this.firestore.collection<PendingGameWithId>('pendingGames').valueChanges({idField: 'id'}).subscribe(data => {
      this.games = data;
      this.loaded = true;
    }));
  }

  public joinGame(game: PendingGameWithId): void {
    this.firestore.collection<ActiveGame>('activeGames').add({
      currentTurn: 1,
      func: game.func,
      initialChips: game.initialChips,
      maxChipsThisTurn: this.calculateMaxChipsFirstTurn(game),
      player1Id: game.player1Id,
      player1Name: game.player1Name,
      player2Id: this.userService.getUser().id,
      player2Name: this.userService.getUser().name,
      turnForPlayer: Math.random() > 0.5 ? 1 : 2
    }).then((activeGame) => {
      this.firestore.collection<PendingGame>('pendingGames').doc(game.id)
        .delete();
      this.router.navigate(['/game', {id: activeGame.id } ]);
    });
  }

  public createGame(): void {
    this.gameCreationInProgress = true;
  }

  private calculateMaxChipsFirstTurn(game: PendingGame): number {
    if (game.func === 'x') {
      return game.initialChips - 1;
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
