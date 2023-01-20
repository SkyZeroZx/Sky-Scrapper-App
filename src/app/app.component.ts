import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeService } from '@core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.suscribeTheme();
  }

  //FOR INSTALL PWA BUTTON
  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(e: any) {
    e.preventDefault();
    this.themeService.promptEvent = e;
  }
}
