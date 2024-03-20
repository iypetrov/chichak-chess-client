import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {PlayerHomeComponent} from "./player-home/player-home.component";
import {PlayerDetailsComponent} from "./player-details/player-details.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'player-home/:id', component: PlayerHomeComponent },
  { path: 'player-details/:id', component: PlayerDetailsComponent },
];
