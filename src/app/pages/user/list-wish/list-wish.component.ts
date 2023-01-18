import { Component, OnInit } from '@angular/core';
import { ListWishService, ThemeService } from '@core/services';
import { ListWish } from '@core/interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-wish',
  templateUrl: './list-wish.component.html',
  styleUrls: ['./list-wish.component.scss'],
})
export class ListWishComponent implements OnInit {
  isLoadingContent: boolean = false;
  listWish: ListWish[] = [];
  constructor(
    private listWishService: ListWishService,
    private themeService: ThemeService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getListWish();
  }

  getListWish() {
    this.isLoadingContent = false;
    this.listWishService.getListWish().subscribe({
      next: (res) => {
        this.listWish = res;
        this.isLoadingContent = true;
      },
      error: (_err) => {
        this.toastService.error('Error getting list wish');
      },
    });
  }

  sharedBook(title: string, isbn: string) {
    this.themeService.sharedItem(title, isbn);
  }
  removeItemListWish(removeIsbn: string) {
    this.listWishService.removeItemListWish(removeIsbn).subscribe({
      next: (_res) => {
        this.listWish = this.listWish.filter(({ isbn }) => isbn !== removeIsbn);
        this.toastService.info('Se elimino de favoritos exitosamente');
      },
    });
  }
}
