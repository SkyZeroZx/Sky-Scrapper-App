import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sectionsMetaData } from '@core/constants';
import { SEOConstantResolver, BookResolver } from '@core/resolvers';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { SearchBookComponent } from './search-book.component';

const routes: Routes = [
  {
    path: '',
    component: SearchBookComponent,
    resolve: { constant: SEOConstantResolver },
    data: {
      animation: 'search-book',
      meta: sectionsMetaData['search-book'].meta,
    },
  },
  {
    path: ':isbn',
    resolve: { bookDetail: BookResolver },
    component: BookDetailComponent,
    data: {
      animation: 'book-detail',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchBookRoutingModule {}
