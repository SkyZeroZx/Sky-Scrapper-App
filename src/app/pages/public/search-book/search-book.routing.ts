import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { SearchBookComponent } from './search-book.component';

const routes: Routes = [
  {
    path: '',
    component: SearchBookComponent,
    data: { animation: 'search-book' },
  },
  {
    path: ':isbn',
    component: BookDetailComponent,
    data: { animation: 'book-detail' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchBookRoutingModule {}
