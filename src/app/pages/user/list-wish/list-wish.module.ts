import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { ListWishRoutingModule } from './list-wish.routing';
import { ListWishComponent } from './list-wish.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ImgHideMissingModule } from '@core/directives';


@NgModule({
  declarations: [
    ListWishComponent
  ],
  imports: [
    CommonModule,
    ImgHideMissingModule,
    NgOptimizedImage,
    NgxSkeletonLoaderModule,
    ListWishRoutingModule
  ]
})
export class ListWishModule { }
