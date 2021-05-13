import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveGame} from "../../model/active-game.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {UserService} from "../../services/user.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public game: ActiveGame;
  public chips = [];
  public win = undefined;
  public takenCnt = 0;
  public loaded = false;
  private gameId: string;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params.id;
      this.firestore.collection<ActiveGame>('activeGames').doc(params.id).snapshotChanges().subscribe(game => {
        this.chips.length = 0;
        this.takenCnt = 0;
        this.game = game.payload.data();
        if (this.win === undefined) {
          if (this.game.initialChips === 0) {
            this.win = false;
            this.firestore.collection<ActiveGame>('activeGames').doc(params.id).delete();
            return;
          }
        }
        for (let i = 0; i < this.game.initialChips; ++i) {
          this.chips.push({taken: false});
        }
        this.loaded = true;
      });
    });
  }

  public isMyTurn(): boolean {
    const player = this.game.turnForPlayer === 1 ? this.game.player1Id : this.game.player2Id;
    return player === this.userService.getUser().id;
  }

  toggleChip(chip: { taken: boolean }) {
    if (chip.taken) {
      chip.taken = false;
      this.takenCnt--;
    } else {
      if (this.game.maxChipsThisTurn === this.takenCnt) { return; }
      chip.taken = true;
      this.takenCnt++;
    }
  }

  nextTurn() {
    this.loaded = false;
    this.game.maxChipsThisTurn = this.getMaxChipsNextTurn();
    if (this.game.turnForPlayer === 1) { this.game.turnForPlayer = 2; }
    else { this.game.turnForPlayer = 1; }
    this.game.initialChips -= this.takenCnt;
    this.game.currentTurn++;
    if (this.game.initialChips === 0) {
      this.win = true;
    }
    this.firestore.collection<ActiveGame>('activeGames').doc(this.gameId).update(this.game).then(
      () => {

      }
    );
  }

  getMaxChipsNextTurn(): number {
    return this.takenCnt;
  }

}
