import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {ActiveGame} from "../../model/active-game.model";
import {filter} from "rxjs/operators";
import {UserService} from "../../services/user.service";
import {PendingGame} from "../../model/pending-game.model";
import {User} from "../../model/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit, OnDestroy {
  private sub= new Subscription()

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sub.add(this.firestore.collection<ActiveGame>('activeGames').snapshotChanges()
      .subscribe(activeGames => {
        const maybeGame = activeGames.filter(activeGame => activeGame.payload.doc.data().player1Id === this.userService.getUser().id);
        if (maybeGame.length === 0) { return; }
        const game = maybeGame[0].payload.doc;
        this.firestore.collection<string>('pendingUsers').doc(game.data().player1Id).delete();
        this.firestore.collection<string>('pendingUsers').doc(game.data().player2Id).delete();
        this.router.navigate(['/game', {id: game.id}]);
      }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
