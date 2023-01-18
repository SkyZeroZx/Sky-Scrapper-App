import {
  AfterContentInit,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { BookService } from '@core/services';
import { QUERY_PARAMS_PAGINATON } from '@core/constants/constant';
import { Book, QueryParamsPagination } from '@core/interfaces';
import { BooksComponent } from '@shared/books/books.component';
import { FeatureSectionComponent } from './components/feature-section/feature-section.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements AfterContentInit {
  listBooks: Book[] = [];
  isContentLoad: boolean = true;
  queryParams: QueryParamsPagination = QUERY_PARAMS_PAGINATON;
  constructor(private readonly bookService: BookService) {}

  @ViewChild('featureSection', { read: ViewContainerRef })
  productListcontainer: ViewContainerRef;
  @ViewChild('book', { read: ViewContainerRef })
  getStartedcontainerBooks: ViewContainerRef;

  private loadFeatureSection() {
    const instance = this.getStartedcontainerBooks.createComponent(
      FeatureSectionComponent
    );
    instance.setInput('listBooks', this.listBooks);
  }

  private loadBooks() {
    const instance =
      this.getStartedcontainerBooks.createComponent(BooksComponent);
    instance.setInput('listBooks', this.listBooks);
  }

  ngAfterContentInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks(this.queryParams).subscribe({
      next: ({ data }) => {
        this.listBooks = data;
        this.isContentLoad = false;
        this.loadFeatureSection();
        this.loadBooks();
      },
      error: (_err) => {
        console.log('error is ', _err);
      },
    });
  }
}
