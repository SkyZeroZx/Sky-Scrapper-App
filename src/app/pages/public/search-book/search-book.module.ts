import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SearchBookComponent } from './search-book.component';
import { SearchBookRoutingModule } from './search-book.routing';
import { BooksModule } from '@shared/books';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImgHideMissingModule } from '@core/directives';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ButtonWishModule } from '@shared/button-wish';
import { BookDetailComponent, ListPriceComponent } from './components';
import { HistoryPriceModule } from '@shared/history-price';

@NgModule({
  declarations: [SearchBookComponent, BookDetailComponent, ListPriceComponent],
  imports: [
    CommonModule,
    BooksModule,
    FormsModule,
    NgOptimizedImage,
    ImgHideMissingModule,
    ButtonWishModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    SearchBookRoutingModule,
    HistoryPriceModule
  ],
})
export class SearchBookModule {}
