import { Component, HostListener } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from '@core/animations/router-animations';
import { ScrollService } from '@core/services';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  animations: [slideInAnimation],
})
export class ContentLayoutComponent {
  isFlyoutMenu = false;
  isMobileMenu = false;
  constructor(
    private contexts: ChildrenOutletContexts,
    private scrollService: ScrollService
  ) {}

  toggleFlyoutMenu() {
    this.isFlyoutMenu = !this.isFlyoutMenu;
  }

  toggleMobileMenu() {
    this.isMobileMenu = !this.isMobileMenu;
  }

  @HostListener('document:scroll', ['$event'])
  handleScroll() {
    this.scrollService.setEventScroll(true);
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
