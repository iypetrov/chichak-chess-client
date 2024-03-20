import {Component, OnInit, ViewChild} from '@angular/core';
import {Player} from "../models/Player";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {PlayerApiService} from "../services/http-serivces/player-api.service";
import {MatButton} from "@angular/material/button";
import {MatLabel} from "@angular/material/form-field";
import {MatSliderModule} from "@angular/material/slider";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {PlayerParticipantion} from "../models/PlayerParticipantion";
import {switchMap} from "rxjs";
import {MatCardFooter} from "@angular/material/card";

@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [
    MatButton,
    MatLabel,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardFooter,
  ],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.scss'
})
export class PlayerDetailsComponent implements OnInit {
  player: Player | undefined;
  playerHistory: PlayerParticipantion[] | undefined;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerApiService: PlayerApiService) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = String(params.get('id'));
          return this.playerApiService.getPlayerById(id);
        })
      )
      .subscribe({
        next: (player: Player) => {
          this.player = player;

          this.playerApiService.getPlayerHistory(player.id, 0, 10000)
            .subscribe({
              next: (playerHistory: PlayerParticipantion[]) => {
                this.playerHistory = playerHistory;
                this.dataSource = new MatTableDataSource<PlayerParticipantion>(this.playerHistory);
                this.dataSource.paginator = this.paginator;
              },
            });
        },
      });
  }

  navigateToPlayerHome() {
    this.router.navigate(['/player-home', this.player?.id]);
  }

}
