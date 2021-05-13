export interface PendingGame {
  func: string;
  initialChips: number;
  player1Id: string;
  player1Name: string;
}

export interface PendingGameWithId extends PendingGame {
  id: string;
}
