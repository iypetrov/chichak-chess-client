import {PlayerPreference} from "./PlayerPreference";

export interface Player {
  id: string;
  playerPreference: PlayerPreference
  nickname: string;
  email: string;
  role: string;
  imageURL: string;
  points: number;
}
