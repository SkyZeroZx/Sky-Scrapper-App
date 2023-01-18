import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AuthGuard as RoleGuard } from '@core/guards';
import { ALL_ROLES } from '@core/constants';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        data: {
          role: [...ALL_ROLES],
        },
        loadChildren: () =>
          import('../app/pages/public/public.module').then(
            (m) => m.PublicModule
          ),
      },
      {
        path: 'user',
        data: {
          role: [...ALL_ROLES],
        },
        canActivateChild: [RoleGuard],
        loadChildren: () =>
          import('../app/pages/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../app/pages/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
