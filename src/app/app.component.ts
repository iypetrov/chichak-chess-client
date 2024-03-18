import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnvironmentService } from './services/util-services/environment/environment.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private environmentService: EnvironmentService) {}

  ngOnInit() {
    this.environmentService.setVersion();
  }
}
