import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthApiService} from "../services/http-serivces/auth-api.service";
import {HttpClientModule} from "@angular/common/http";
import {Player} from "../models/Player";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {LoginRequest} from "../models/LoginRequest";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HttpClientModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButton,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  sendLoginRequest(): void {
    if (this.loginForm.valid) {
      const payload: LoginRequest = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      } as LoginRequest;
      this.authService.sendLoginRequest(payload)
        .subscribe({
          next: (player: Player) => {
            this.router.navigate(['/player-home', player.id]);
          },
        });
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
