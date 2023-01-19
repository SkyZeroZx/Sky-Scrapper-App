import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { QUERY_PARAMS_PAGINATON } from '@core/constants';
import {
  Book,
  PaginationMetaParams,
  QueryParamsPagination,
} from '@core/interfaces';
import { BookService } from '@core/services';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.scss'],
})
export class SearchBookComponent implements OnInit {
  searchBookForm: FormGroup;
  isContentLoaded: boolean = false;

  queryParams: QueryParamsPagination = QUERY_PARAMS_PAGINATON;
  paginationMeta: PaginationMetaParams;
  listBooks: Book[] = [];
  constructor(private fb: FormBuilder, private bookService: BookService) {}

  ngOnInit(): void {
    this.createFormSearchBook();
    this.searchBookByFilter();
    this.searchBookByOder();
    this.getBooks();
  }

  createFormSearchBook() {
    this.searchBookForm = this.fb.group({
      search: QUERY_PARAMS_PAGINATON.search,
      order: QUERY_PARAMS_PAGINATON.order,
    });
  }

  searchBookByFilter() {
    this.searchBookForm.controls['search'].valueChanges
      .pipe(debounceTime(800), distinctUntilChanged())
      .subscribe((search: string) => {
        this.queryParams.search = search;
        this.getBooks();
      });
  }

  searchBookByOder() {
    this.searchBookForm.controls['order'].valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((order: number) => {
        this.queryParams.order = order;
        this.getBooks();
      });
  }

  getBooks() {
    this.isContentLoaded = false;
    this.bookService.getBooks(this.queryParams).subscribe({
      next: ({ data, meta }) => {
        this.listBooks = data;
        this.paginationMeta = meta;
        this.isContentLoaded = true;
      },
    });
  }

  onPageChange($event: number) {
    this.queryParams.page = $event;
    this.getBooks();
  }
}
