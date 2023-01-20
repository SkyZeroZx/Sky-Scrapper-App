import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountComponent } from './discount.component';

const routes: Routes = [
  {
    path: '',
    component: DiscountComponent,
    data: { animation: 'discount' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountRoutingModule {}
