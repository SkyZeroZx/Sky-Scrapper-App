import { Component, Input } from '@angular/core';
import { BookDetails } from '@core/interfaces';

@Component({
  selector: 'app-list-price',
  templateUrl: './list-price.component.html',
  styleUrls: ['./list-price.component.scss']
})
export class ListPriceComponent {
  @Input()
  listBookDetails: BookDetails[] = [];

}
