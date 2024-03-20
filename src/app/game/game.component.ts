import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {GameApiService} from "../services/http-serivces/game-api.service";
import {GameState} from "../models/GameState";
import {JsonPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {PlayerApiService} from "../services/http-serivces/player-api.service";
import {PlayerParticipantion} from "../models/PlayerParticipantion";

@Component({
  imports: [
    JsonPipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton
  ],
  selector: 'app-game',
  standalone: true,
  styleUrl: './game.component.scss',
  templateUrl: './game.component.html'
})

export class GameComponent implements OnInit {
  gameState: GameState | undefined;
  playerParticipation: PlayerParticipantion | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameApiService: GameApiService,
    private playerApiService: PlayerApiService) {
  }

  ngOnInit(): void {
    this.startTimer();
    this.route.paramMap
      .subscribe((params: ParamMap): void => {
          const gameID = String(params.get('id'));
          this.playerApiService.getPlayerGameStatus(localStorage.getItem("playerID")!, gameID)
            .subscribe({
              next: (playerParticipation: PlayerParticipantion): void => {
                this.playerParticipation = playerParticipation;
              },
            })
        }
      )
  }

  startTimer() {
    setInterval(() => {
      this.refreshBoard();
    }, 1000);
  }

  refreshBoard() {
    const id = this.route.snapshot.paramMap.get('id');
    this.gameApiService
      .getCurrentGameState(id!)
      .subscribe({
        next: (gameState: GameState): void => {
          this.gameState = gameState;
        },
      })
  }

  makeMove(value: string) {
    const id = this.route.snapshot.paramMap.get('id');
    this.gameApiService.makeMovement(id!, this.playerParticipation?.playerID, value)
      .subscribe({
        next: (gameState: GameState): void => {
          this.gameState = gameState;
        },
      })
  }

  surrender() {

  }
}
