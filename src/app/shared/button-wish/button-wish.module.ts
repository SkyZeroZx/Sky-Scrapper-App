import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonWishComponent } from './button-wish.component';
import { HeartWishModule } from '@core/directives';

@NgModule({
  declarations: [ButtonWishComponent],
  imports: [HeartWishModule, CommonModule],
  exports: [ButtonWishComponent],
})
export class ButtonWishModule {}
