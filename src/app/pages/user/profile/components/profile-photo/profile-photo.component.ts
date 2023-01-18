import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AuthService, UserService } from '@core/services';
import { previewUrlFile } from '@core/helper';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss'],
})
export class ProfilePhotoComponent {
  @Input()
  userPhoto: string;
  @Output()
  updatePhoto = new EventEmitter();

  baseUrl: string = environment.API_URL;
  @ViewChild('userAvatarFile')
  readonly inputFileAvatarUser: ElementRef;
  @ViewChild('swalUploadPhoto')
  readonly swalUploadPhoto: SwalComponent;
  swalPhotoUser: string;
  fileUserAvatar: File;

  constructor(
    public readonly swalPortalTargets: SwalPortalTargets,
    private userService: UserService,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {}

  async userAvatarSelected(event: any) {
    if (typeof event.target.files[0] !== 'undefined') {
      try {
        this.swalPhotoUser = await previewUrlFile(event.target.files[0]);
        this.fileUserAvatar = event.target.files[0];
        this.swalUploadPhoto.fire();
      } catch (error) {
        this.toastrService.error('Sucedio un error al seleccionar su foto');
      }
    }
  }

  uploadPhoto() {
    this.userService.uploadPhoto(this.fileUserAvatar).subscribe({
      next: (_res) => {
        this.toastrService.success('Se actualizo su foto de perfil');
        this.authService.isLogged();
        this.updatePhoto.emit();
      },
      error: (_err) => {
        this.toastrService.error('Sucedio un error al subir su foto');
      },
    });
  }
}
