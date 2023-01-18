import { NgModule } from '@angular/core';
import { HeartWishDirective } from './heart-wish.directive';

@NgModule({
  declarations: [HeartWishDirective],
  exports: [HeartWishDirective],
})
export class HeartWishModule {}
