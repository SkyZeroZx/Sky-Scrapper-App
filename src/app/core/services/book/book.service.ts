import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  Book,
  BookDetails,
  BookDiscount,
  HistoryPrice,
  ListHistoryPrice,
  Pagination,
  QueryParamsPagination,
} from '@core/interfaces';
import { map, Observable } from 'rxjs';
import { formatedLastDiscont, formatedListPrice } from '@core/helper';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(
    queryParameters?: QueryParamsPagination
  ): Observable<Pagination<any>> {
    let params: HttpParams = new HttpParams();
    params = params.set('take', queryParameters.take);
    params = params.set('page', queryParameters.page);
    params = params.set('order', queryParameters.order);
    params = params.set('search', queryParameters.search || '');
    return this.http.get<Pagination<any>>(`${environment.API_URL}/book`, {
      params,
    });
  }

  getBookByIsbn(isbn: string): Observable<BookDetails[]> {
    return this.http.get<BookDetails[]>(
      `${environment.API_URL}/book-detail/${isbn}`
    );
  }

  getHistoryPriceByIsbn(isbn: string): Observable<ListHistoryPrice> {
    return this.http
      .get<HistoryPrice[]>(`${environment.API_URL}/history-price/${isbn}`)
      .pipe(
        map((res) => {
          return formatedListPrice(res);
        })
      );
  }

  getLastDiscount(): Observable<Book[]> {
    return this.http
      .get<BookDiscount[]>(`${environment.API_URL}/history-price/discount`)
      .pipe(
        map((data) => {
          return formatedLastDiscont(data);
        })
      );
  }
}
