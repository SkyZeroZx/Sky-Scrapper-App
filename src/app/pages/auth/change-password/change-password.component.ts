import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  changePasswordFrom: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createFormChangePassword();
  }

  createFormChangePassword() {
    this.changePasswordFrom = this.fb.group({
      oldPassword: [null, [Validators.required, Validators.minLength(5)]],
      newPassword: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  changePassword() {
    this.authService.changePassword(this.changePasswordFrom.value).subscribe({
      next: (_res) => {
        this.router.navigate(['/']);
        this.toastService.success('Contraseña cambiada exitosamente');
      },
    });
  }
}
