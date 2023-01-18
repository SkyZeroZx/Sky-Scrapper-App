import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryPriceComponent } from './history-price.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [HistoryPriceComponent],
  imports: [NgChartsModule, CommonModule],
  exports: [HistoryPriceComponent],
})
export class HistoryPriceModule {}
