import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHeartWish]',
})
export class HeartWishDirective {
  constructor(private buttonElement: ElementRef) {}

  @HostListener('click')
  onClick() {
    const element = this.buttonElement.nativeElement as HTMLElement;
    const isActive = element.classList.contains('active');
    if (isActive) {
      element.classList.remove('active');
      element.classList.add('deactivate');
      setTimeout(() => {
        element.classList.remove('deactivate');
      }, 700);
    } else {
      element.classList.remove('deactivate');
      element.classList.add('active');
    }
  }
}
