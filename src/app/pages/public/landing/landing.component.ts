import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BookService, ScrollService } from '@core/services';
import { QUERY_PARAMS_PAGINATON } from '@core/constants/constant';
import { Book, QueryParamsPagination } from '@core/interfaces';
import { take } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  listBooks: Book[] = [];

  isContentLoad = true;

  queryParams: QueryParamsPagination = structuredClone(QUERY_PARAMS_PAGINATON);

  @ViewChild('featureSection', { read: ViewContainerRef })
  productListcontainer: ViewContainerRef;

  @ViewChild('book', { read: ViewContainerRef })
  getStartedcontainerBooks: ViewContainerRef;

  isScrolling = false;

  constructor(
    private readonly bookService: BookService,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.scrollService.getEventScroll$.pipe(take(1)).subscribe({
      next: (onScroll) => {
        onScroll && this.handleScroll();
      },
    });
  }

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

  async handleScroll() {
    if (!this.isScrolling) {
      this.isScrolling = true;
      this.getBooks();
    }
    this.isScrolling = true;
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
