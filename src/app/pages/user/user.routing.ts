import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sectionsMetaData } from '@core/constants';
import { SEOConstantResolver } from '@core/resolvers';

const routes: Routes = [
  {
    path: 'profile',
    data: sectionsMetaData.profile,
    resolve: { constant: SEOConstantResolver },
    loadChildren: () =>
      import('../user/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'list-wish',
    data: sectionsMetaData['list-wish'],
    resolve: { constant: SEOConstantResolver },
    loadChildren: () =>
      import('../user/list-wish/list-wish.module').then(
        (m) => m.ListWishModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
