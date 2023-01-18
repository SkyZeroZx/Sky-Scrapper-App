import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ALL_ROLES } from '@core/constants';
import { ChangePasswordComponent } from './change-password.component';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent,
    data: { role: [...ALL_ROLES], animation: 'change-password' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePasswordRoutingModule {}
