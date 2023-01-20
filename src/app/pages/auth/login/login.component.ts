import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, ThemeService } from '@core/services';
import { USER_OPTIONS } from '@core/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isFingerprint: boolean = this.themeService.existInStorage(
    USER_OPTIONS.FINGERPRINT
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createFormLogin();
  }

  createFormLogin() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  logIn() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (_res) => {
        this.router.navigate(['/']);
      },
    });
  }

  startAuthentication() {
    this.authService.startAuthentication().subscribe({
      next: (_res) => {
        this.router.navigate(['/']);
      },
    });
  }
}
