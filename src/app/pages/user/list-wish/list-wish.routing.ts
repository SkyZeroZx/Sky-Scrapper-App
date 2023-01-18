import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListWishComponent } from './list-wish.component';

const routes: Routes = [
  {
    path: '',
    component: ListWishComponent,
    data: { animation: 'list-wish' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListWishRoutingModule {}
