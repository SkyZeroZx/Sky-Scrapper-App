import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService, ThemeService, ListWishService } from '@core/services';
import { BookDetails, ListHistoryPrice } from '@core/interfaces';
import { ToastrService } from 'ngx-toastr';

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
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.getRouteParams();
  }

  getRouteParams(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      const isbn = res.get('isbn');
      if (localStorage.getItem('token')) {
        this.getWish(isbn);
      }
      this.getChart(isbn);
      this.getBookByIsbn(isbn);
    });
  }

  getBookByIsbn(isbn: string) {
    this.isContentLoaded = false;
    this.bookService.getBookByIsbn(isbn).subscribe({
      next: (res) => {
        this.isContentLoaded = true;
        this.listBookDetails = res;
        this.filterData();
      }
    });
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

  filterData() {
    this.bookDetails = {
      price: +this.getValueDefined('price'),

      editorial: this.getValueDefined('editorial'),

      isbn: this.getValueDefined('isbn'),

      linkProduct: this.getValueDefined('linkProduct'),

      category: this.getValueDefined('category'),

      image: this.getValueDefined('image'),

      shop: this.getValueDefined('shop'),

      title: this.getValueDefined('title'),
      
      author: this.getValueDefined('author'),
    };
  }

  getValueDefined(value: string) {
    return this.listBookDetails.find((res) => res[value] !== 'null')[value];
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
