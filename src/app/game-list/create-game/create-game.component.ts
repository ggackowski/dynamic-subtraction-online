import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PendingGame} from "../../model/pending-game.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {
  public game: PendingGame = {
    func: 'x',
    initialChips: 10,
    player1Name: 'wst',
    player1Id: 'wst'
  };

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.game.player1Id = this.userService.getUser().id;
    this.game.player1Name = this.userService.getUser().name;
  }

  public createGame(): void {
    this.firestore.collection<PendingGame>('pendingGames').add(this.game).then(() => {
      this.router.navigate(['/lobby']);
    });
  }

}
