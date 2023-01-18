import { NgModule } from '@angular/core';
import { ImgHideMissingDirective } from './img-hide-missing.directive';
 

@NgModule({
  declarations: [ImgHideMissingDirective ],
  exports: [ ImgHideMissingDirective],
})
export class ImgHideMissingModule {}
