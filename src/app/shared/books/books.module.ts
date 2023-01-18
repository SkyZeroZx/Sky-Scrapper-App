import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BooksComponent } from './books.component';
import { ImgHideMissingModule } from '@core/directives';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [BooksComponent],
  imports: [
    CommonModule,
    NgOptimizedImage,
    NgxPaginationModule,
    ImgHideMissingModule,
  ],
  exports: [BooksComponent],
})
export class BooksModule {}
