import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { LandingRoutingModule } from './landing.routing';
import { LandingComponent } from './landing.component';
import { BooksModule } from '@shared/books/books.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { FeatureSectionComponent } from './components/feature-section/feature-section.component';

@NgModule({
  declarations: [LandingComponent, CarrouselComponent, FeatureSectionComponent],
  imports: [
    CommonModule,
    CarouselModule,
    BooksModule,
    NgOptimizedImage,
    LandingRoutingModule,
  ],
})
export class LandingModule {}
