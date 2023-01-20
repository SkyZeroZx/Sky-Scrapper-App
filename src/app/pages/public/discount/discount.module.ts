import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountComponent } from './discount.component';
import { DiscountRoutingModule } from './discount.routing';
import { BooksModule } from '@shared/books';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [DiscountComponent],
  imports: [
    CommonModule,
    DiscountRoutingModule,
    NgxSkeletonLoaderModule,
    BooksModule,
  ],
})
export class DiscountModule {}
