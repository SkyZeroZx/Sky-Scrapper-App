import {
  AfterContentInit,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { BookService } from '@core/services';
import { QUERY_PARAMS_PAGINATON } from '@core/constants/constant';
import { Book, QueryParamsPagination } from '@core/interfaces';
import { concat } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements AfterContentInit {
  listBooks: Book[] = [];
  isContentLoad: boolean = true;
  queryParams: QueryParamsPagination = QUERY_PARAMS_PAGINATON;
  @ViewChild('featureSection', { read: ViewContainerRef })
  productListcontainer: ViewContainerRef;
  @ViewChild('book', { read: ViewContainerRef })
  getStartedcontainerBooks: ViewContainerRef;

  constructor(private readonly bookService: BookService) {}

  private async loadFeatureSection() {
    const { FeatureSectionComponent } = await import(
      './components/feature-section/feature-section.component'
    );

    const instance = this.getStartedcontainerBooks.createComponent(
      FeatureSectionComponent
    );
    instance.setInput('listBooks', this.listBooks);
  }

  private async loadBooks() {
    const { BooksComponent } = await import('@shared/books/books.component');

    const instance =
      this.getStartedcontainerBooks.createComponent(BooksComponent);
    instance.setInput('listBooks', this.listBooks);
  }

  ngAfterContentInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks(this.queryParams).subscribe({
      next: async ({ data }) => {
        this.listBooks = data;
        this.isContentLoad = false;
        await this.loadFeatureSection();
        await this.loadBooks();
      },
    });
  }
}
