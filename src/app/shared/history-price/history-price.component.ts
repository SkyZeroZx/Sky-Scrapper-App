import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { labels, lineChartOptions } from '@core/config/charts.config';
import { ListHistoryPrice } from '@core/interfaces';

@Component({
  selector: 'app-history-price',
  templateUrl: './history-price.component.html',
  styleUrls: ['./history-price.component.scss'],
})
export class HistoryPriceComponent {
  @Input()
  listHistoryPrice: ListHistoryPrice;

  lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective;
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };
  lineChartOptions: ChartConfiguration['options'] = lineChartOptions;

  ngOnChanges(): void {
    this.loadLinearChart();
  }

  loadLinearChart() {
    this.lineChartData.labels = this.listHistoryPrice?.listDays;
    this.lineChartData.datasets = [
      {
        data: this.listHistoryPrice?.listPrice,
        label: labels[0],
        fill: 'origin',
        backgroundColor: 'rgba(108, 117, 238,0.4)',
        borderColor: 'rgba(108, 117, 238,0.5)',
        pointBackgroundColor: 'rgba(108, 117, 238, 0.2)',
        pointBorderColor: 'rgba(108, 117, 238)',
        pointHoverBackgroundColor: 'rgba(72, 116, 159)',
        pointHoverBorderColor: 'rgba(108, 117, 238,0.2)',
        pointStyle: 'circle',
      },
    ];
    this.chart?.update();
  }
}
