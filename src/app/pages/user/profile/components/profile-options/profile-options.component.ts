import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { USER_OPTIONS } from '@core/constants';
import { AuthService, NotificationService, ThemeService } from '@core/services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss'],
})
export class ProfileOptionsComponent implements OnInit {
  profileOptionsForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private toastService: ToastrService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.profileOptionsForm = this.fb.group({
      notifications: this.themeService.existInStorage(
        USER_OPTIONS.NOTIFICATIONS
      ),
      userInstallPwa: false,
      fingerprint: this.themeService.existInStorage(USER_OPTIONS.FINGERPRINT),
    });
  }

  shouldInstall(): boolean {
    return this.themeService.shouldInstall();
  }

  onChangeInstallPwa(event) {
    if (event.target.checked) {
      this.themeService.getInstallPwa.prompt();
    }
  }

  async suscribeNotifications(event) {
    if (event.target.checked) {
      await this.notificationService.saveUserNotification();
      this.toastService.success('Se activaron exitosamente las notificaciones');
    } else {
      this.profileOptionsForm.controls['notifications'].setValue(false, {
        emitEvent: false,
      });
      localStorage.setItem(USER_OPTIONS.NOTIFICATIONS, 'false');
    }
  }

  onChangeFingerPrint(event) {
    if (event.target.checked) {
      this.authService.getRegistrationAuthnWeb().subscribe({
        next: (_res) => {
          this.toastService.success('Se habilito exitosamente fingerprint');
        },
      });
    } else {
      this.profileOptionsForm.controls['fingerprint'].setValue(false, {
        emitEvent: false,
      });
      localStorage.setItem(USER_OPTIONS.FINGERPRINT, 'false');
    }
  }
}
