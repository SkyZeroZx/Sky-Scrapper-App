import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from '@core/animations/router-animations';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  animations: [slideInAnimation],
})
export class ContentLayoutComponent {
  
  isFlyoutMenu = false;
  isMobileMenu = false;
  constructor(private contexts: ChildrenOutletContexts) {}

  toggleFlyoutMenu() {
    this.isFlyoutMenu = !this.isFlyoutMenu;
  }
  toggleMobileMenu() {
    this.isMobileMenu = !this.isMobileMenu;
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
