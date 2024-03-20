export interface PlayerParticipantion {
  id: string;
  gameID: string;
  playerID: string;
  opponentID: string;
  color: string;
  isWinner: boolean;
  isDraw: boolean;
}
