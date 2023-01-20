import { Component, OnInit } from '@angular/core';
import { BookService, SEOService } from '@core/services';
import { Book, PaginationMetaParams } from '@core/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit {
  isContentLoaded: boolean = false;
  listBooks: Book[] = [];
  paginationMeta: PaginationMetaParams = {
    take: 100,
  };
  constructor(
    private bookService: BookService,
    private SEOService: SEOService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { meta } = this.route.snapshot.data;
    this.SEOService.updateTitle(meta.title);
    this.SEOService.updateDescription(meta.description);
    this.getLastDiscount();
  }

  getLastDiscount() {
    this.isContentLoaded = false;
    this.bookService.getLastDiscount().subscribe({
      next: (res) => {
        this.listBooks = res;
        this.isContentLoaded = true;
      },
    });
  }
}
