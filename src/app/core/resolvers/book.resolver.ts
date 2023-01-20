import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { BookDetails } from '@core/interfaces';
import { BookService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class BookResolver implements Resolve<BookDetails[]> {
  constructor(private bookService: BookService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<BookDetails[]> {
    const isbn = route.paramMap.get('isbn');
    return this.bookService.getBookByIsbn(isbn);
  }
}
