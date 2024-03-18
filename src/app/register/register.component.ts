import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RegisterRequest} from "../models/RegisterRequest";
import {AuthApiService} from "../services/http-serivces/auth-api.service";
import {Player} from "../models/Player";
import {MatButton} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatStepperModule} from "@angular/material/stepper";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nickname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  sendRegisterRequest(): void {
    if (this.registerForm.valid) {
      const payload: RegisterRequest = {
        nickname: this.registerForm.get('nickname')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value
      } as RegisterRequest;
      this.authService.sendRegistrationRequest(payload)
        .subscribe({
          next: (player: Player) => {
            this.router.navigate(['/player-home', player.id]);
          },
        });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
