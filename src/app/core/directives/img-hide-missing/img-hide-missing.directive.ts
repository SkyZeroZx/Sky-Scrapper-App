import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[imgHideMissing]',
})
export class ImgHideMissingDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('error')
  onError() {
    this.elementRef.nativeElement.src = '../../../../assets/images/logo.svg';
  }
}
