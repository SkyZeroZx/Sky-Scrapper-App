import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ALL_ROLES } from '../../core/constants';

export const publicRoutes: Routes = [
  {
    path: 'search-book',
    loadChildren: () =>
      import('../public/search-book/search-book.module').then(
        (m) => m.SearchBookModule
      ),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('../public/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'faq',
    loadChildren: () =>
      import('../public/faq/faq.module').then((m) => m.FaqModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('../public/landing/landing.module').then((m) => m.LandingModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(publicRoutes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
