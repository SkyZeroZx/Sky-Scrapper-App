import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private onScroll$ = new Subject<boolean>();

  get getEventScroll$(): Observable<boolean> {
    return this.onScroll$.asObservable();
  }

  setEventScroll(value: boolean) {
    this.onScroll$.next(value);
  }
}
