import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ItemListWishDto, ListWish, Response } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ListWishService {
  constructor(private http: HttpClient) {}

  getListWish(): Observable<ListWish[]> {
    return this.http.get<ListWish[]>(`${environment.API_URL}/list-wish`);
  }

  isWish(isbn: string): Observable<boolean> {
    return this.http
      .get<ListWish>(`${environment.API_URL}/list-wish/${isbn}`)
      .pipe(
        map((res) => {
          return res ? true : false;
        })
      );
  }

  addItemListWish(itemListWishDto: ItemListWishDto): Observable<ListWish> {
    return this.http.post<ListWish>(
      `${environment.API_URL}/list-wish`,
      itemListWishDto
    );
  }

  removeItemListWish(isbn: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.API_URL}/list-wish/${isbn}`);
  }
}
