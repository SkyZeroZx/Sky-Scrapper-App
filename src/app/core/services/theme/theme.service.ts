import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { USER_OPTIONS } from '@core/constants';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme = new BehaviorSubject(
    this.existInStorage(USER_OPTIONS.DARK_THEME)
  );
  // Declare event of listening for install pwa in toggle in user options
  public promptEvent: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private toastService: ToastrService
  ) {}

  get getInstallPwa() {
    return this.promptEvent;
  }

  shouldInstall(): boolean {
    return (
      !window.matchMedia('(display-mode: standalone)').matches &&
      this.getInstallPwa
    );
  }

  existInStorage(item: string): boolean {
    return localStorage.getItem(item) == 'true';
  }

  setTheme(option: boolean) {
    localStorage.setItem(USER_OPTIONS.DARK_THEME, option.toString());
    this.theme.next(option);
  }

  suscribeTheme() {
    this.theme.subscribe((res) => {
      if (res) {
        this.document.querySelector('html').classList.add('dark');
      } else {
        this.document.querySelector('html').classList.remove('dark');
      }
    });
  }

  async sharedItem(title: string, isbn: string): Promise<void> {
    try {
      await navigator.share({
        title,
        text: 'Best price in mangas\n',
        url: window.location.origin + '/search-book/' + isbn,
      });
    } catch (error) {
      console.error('error shared', error);
      this.toastService.error('Sucedio un error al intentar compartir');
    }
  }
}
