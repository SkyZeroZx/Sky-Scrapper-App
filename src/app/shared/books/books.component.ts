import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Book, PaginationMetaParams } from '@core/interfaces';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  @Input()
  listBooks: Book[] = [];
  @Input()
  paginationMeta: PaginationMetaParams;
  @Output()
  pageChange = new EventEmitter<number>();
  currentPage: number = 1;

  constructor(private router: Router) {}

  getBookSelected(book: Book) {
    console.log('Book Selected', book);
    this.router.navigate(['search-book', book.isbn]);
  }

  onPageChange($event : number) {
   
    this.pageChange.emit($event);
  }
}
