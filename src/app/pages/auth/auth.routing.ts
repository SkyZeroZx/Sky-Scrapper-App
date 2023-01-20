import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { sectionsMetaData } from '@core/constants';
import { SEOConstantResolver } from '@core/resolvers';

const routes: Routes = [
  {
    path: 'login',
    data: sectionsMetaData.login,
    resolve: { constant: SEOConstantResolver },
    loadChildren: () =>
      import('../auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'change-password',
    data: sectionsMetaData['change-password'],
    resolve: { constant: SEOConstantResolver },
    loadChildren: () =>
      import('../auth/change-password/change-password.module').then(
        (m) => m.ChangePasswordModule
      ),
  },
  {
    path: 'forgot-password',
    data: sectionsMetaData['forgot-password'],
    resolve: { constant: SEOConstantResolver },
    loadChildren: () =>
      import('../auth/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: 'register',
    data: sectionsMetaData.register,
    resolve: { constant: SEOConstantResolver },
    loadChildren: () =>
      import('../auth/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
