import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { SEOService } from '@core/services';

@Injectable({
  providedIn: 'root',
})
export class SEOConstantResolver implements Resolve<void> {
  constructor(private SEOService: SEOService) {}

  resolve(snapshot: ActivatedRouteSnapshot): Observable<void> {
    this.getSEO(snapshot);
    return null;
  }

  getSEO(snapshot: ActivatedRouteSnapshot) {
    const { meta } = snapshot.data;
    this.SEOService.updateTitle(meta.title);
    this.SEOService.updateDescription(meta.description);
  }
}
