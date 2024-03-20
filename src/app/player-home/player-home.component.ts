import {Component, OnInit} from '@angular/core';
import {Player} from "../models/Player";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {PlayerApiService} from "../services/http-serivces/player-api.service";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {MatLabel} from "@angular/material/form-field";
import {AuthApiService} from "../services/http-serivces/auth-api.service";
import {MatIconModule} from "@angular/material/icon";
import {GameApiService} from "../services/http-serivces/game-api.service";
import {Game} from "../models/Game";

@Component({
  selector: 'app-player-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButton,
    MatStepperModule,
    MatLabel,
    MatIconModule,
  ],
  templateUrl: './player-home.component.html',
  styleUrl: './player-home.component.scss'
})
export class PlayerHomeComponent implements OnInit {
  player: Player | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameApiService: GameApiService,
    private playerApiService: PlayerApiService,
    private authService: AuthApiService ) { }
  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params: ParamMap): void => {
          const id = String(params.get('id'));
          localStorage.setItem("playerID", id);
          this.playerApiService
            .getPlayerById(id)
            .subscribe({
              next: (player: Player): void => {
                this.player = player;
              },
            })
        }
      )
  }

  enrollGame() {
    this.gameApiService.enrollGame(this.player?.id)
      .subscribe({
        next: (game: Game) => {
          this.router.navigate(['/game', game.id]);
        },
      });
  }

  logOut() {
    // this.authService.sendLogoutRequest()
    //   .subscribe({
    //     next: () => {
    //       this.router.navigate(['/']);
    //     },
    //   });
    this.router.navigate(['/']);
  }

  navigateToPlayerDetails() {
    this.router.navigate(['/player-details', this.player?.id]);
  }
}

