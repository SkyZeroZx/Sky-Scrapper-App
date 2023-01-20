import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.signupForm = this.fb.group({
      firstName: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ],
      ],
      lastName: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(200),
        ],
      ],
    });
  }

  signup() {
    this.authService.singIn(this.signupForm.value).subscribe({
      next: (_res) => {
        this.toastService.success('Se registro exitosamente');
        this.toastService.info('Se envio su contraseña a su correo');
        this.router.navigate(['/']);
      },
      error: (_err) => {
        this.toastService.error('Error al registrarse');
      },
    });
  }
}
