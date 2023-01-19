import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '@core/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  getPhoto: string = null;
  isLoadingContent: boolean = false;

  constructor(
    private toastService: ToastrService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createProfileForm();
    this.getProfile();
  }

  getProfile() {
    this.isLoadingContent = false;
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.profileForm.patchValue(res);
        this.getPhoto = res.image;
        this.isLoadingContent = true;
      },
    });
  }

  createProfileForm() {
    this.profileForm = this.fb.group({
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
      role: '',
    });
  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value).subscribe({
      next: (_res) => {
        this.toastService.success('Se actualizo exitosamente su perfil');
      },
    });
  }
}
