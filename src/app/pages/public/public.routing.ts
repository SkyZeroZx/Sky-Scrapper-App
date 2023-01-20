import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sectionsMetaData } from '@core/constants';
import { SEOConstantResolver } from '@core/resolvers';

export const publicRoutes: Routes = [
  {
    path: 'search-book',
    loadChildren: () =>
      import('../public/search-book/search-book.module').then(
        (m) => m.SearchBookModule
      ),
  },
  {
    path: 'discount-book',
    data: sectionsMetaData.discount,
    loadChildren: () =>
      import('../public/discount/discount.module').then(
        (m) => m.DiscountModule
      ),
  },
  {
    path: 'about',
    data: sectionsMetaData.about,
    resolve: { constant: SEOConstantResolver },
    loadChildren: () =>
      import('../public/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'faq',
    data: sectionsMetaData.faq,
    resolve: { constant: SEOConstantResolver },
    loadChildren: () =>
      import('../public/faq/faq.module').then((m) => m.FaqModule),
  },
  {
    path: '',
    data: sectionsMetaData.homePage,
    resolve: { constant: SEOConstantResolver },
    loadChildren: () =>
      import('../public/landing/landing.module').then((m) => m.LandingModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(publicRoutes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
