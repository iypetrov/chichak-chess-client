import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Player} from "../models/Player";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {PlayerApiService} from "../services/http-serivces/player-api.service";

@Component({
  selector: 'app-player-home',
  standalone: true,
  imports: [],
  templateUrl: './player-home.component.html',
  styleUrl: './player-home.component.scss'
})
export class PlayerHomeComponent implements OnInit {
  selectedPlayer$: BehaviorSubject<Player> = new BehaviorSubject<Player>({} as Player);
  player: Player | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerApiService: PlayerApiService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params: ParamMap): void => {
          const id = String(params.get('id'));
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
}

