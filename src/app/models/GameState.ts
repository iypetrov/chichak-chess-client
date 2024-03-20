import {Game} from "./Game";

export interface GameState {
  id: string;
  game: Game;
  boardState: string;
  activeColor: string;
  castleAvailability: string;
  enPassantTargetSquare: string;
  halfmoveClock: number;
  fullmoveNumber: number;
  isFinal: boolean;
  createdOn: Date;
}
