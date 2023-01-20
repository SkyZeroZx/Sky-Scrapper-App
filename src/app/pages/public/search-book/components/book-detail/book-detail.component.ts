import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BookService,
  ThemeService,
  ListWishService,
  SEOService,
} from '@core/services';
import { BookDetails, ListHistoryPrice } from '@core/interfaces';
import { ToastrService } from 'ngx-toastr';
import { formatedBookDetail } from '@core/helper';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  listBookDetails: BookDetails[] = [];
  bookDetails: BookDetails;
  isContentLoaded: boolean = false;
  listHistoryPrice: ListHistoryPrice;
  isWish: boolean = false;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private listWishService: ListWishService,
    private toastService: ToastrService,
    private themeService: ThemeService,
    private seoService: SEOService
  ) {}

  ngOnInit(): void {
    this.getRouterData();
  }

  getRouterData(): void {
    this.isContentLoaded = false;
    this.activatedRoute.data.subscribe({
      next: (res) => {
        const isbn: string = res['bookDetail'][0].isbn;
        const title: string = res['bookDetail'][0].title;
        const category: string = res['bookDetail'][0].category;
        const description = title + ' ' + category;
        this.getSEO(title, description);
        if (localStorage.getItem('token')) {
          this.getWish(isbn);
        }
        this.getChart(isbn);
        this.getBookByIsbn(res['bookDetail']);
      },
    });
  }

  getSEO(title: string, description: string) {
    this.seoService.updateTitle(title);
    this.seoService.updateDescription(description);
  }

  getBookByIsbn(bookDetails: BookDetails[]) {
    this.isContentLoaded = true;
    this.listBookDetails = bookDetails;
    this.formatedBookDetail();
  }

  getChart(isbn: string) {
    this.bookService.getHistoryPriceByIsbn(isbn).subscribe({
      next: (res) => {
        this.listHistoryPrice = res;
      },
    });
  }

  getWish(isbn: string) {
    this.listWishService.isWish(isbn).subscribe({
      next: (res) => {
        this.isWish = res;
      },
    });
  }

  formatedBookDetail() {
    this.bookDetails = formatedBookDetail(this.listBookDetails);
  }

  sharedBook(title: string, isbn: string) {
    this.themeService.sharedItem(title, isbn);
  }

  addItem() {
    const isLogged = localStorage.getItem('token');
    if (!isLogged) {
      this.toastService.warning('Para agregar favoritos debe logearse');
      return null;
    }

    if (!this.isWish) {
      this.listWishService.addItemListWish(this.bookDetails).subscribe({
        next: (_res) => {
          this.isWish = true;
          this.toastService.info('Se agrego a favoritos exitosamente');
        },
      });
      return null;
    }

    this.listWishService.removeItemListWish(this.bookDetails.isbn).subscribe({
      next: (_res) => {
        this.isWish = false;
        this.toastService.info('Se elimino de favoritos exitosamente');
      },
    });
  }
}
