import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ALL_ROLES } from '@core/constants';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () =>
      import('../user/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'list-wish',
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
