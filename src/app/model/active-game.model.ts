export interface ActiveGame {
  currentTurn: number;
  func: string;
  initialChips: number;
  maxChipsThisTurn: number;
  player1Id: string;
  player1Name: string;
  player2Id: string;
  player2Name: string;
  turnForPlayer: number;
}

