import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration } from 'chart.js';
import { dateTimeFormatOptions } from '@core/config/locale.config';

const tooltipFormat = {
  callbacks: {
    title: function (titleItems: any) {
      return new Date(titleItems[0].label).toLocaleDateString(
        'es-PE',
        dateTimeFormatOptions
      );
    },
  },
};

export const pieChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
      },
    },
    datalabels: {
      formatter: (value: number, ctx) => {
        const datapoints = ctx.chart.data.datasets[0].data;
        const totalCount = datapoints.reduce(
          (total: number, datapoint: number) => total + datapoint,
          0
        );
        const percentage = (value / +totalCount) * 100;
        return percentage.toFixed(2) + '%';
      },
      color: '#FFFF',
    },
  },
};

export const barChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  scales: {
    x: {
      display: true,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    tooltip: tooltipFormat,
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
      },
    },
    datalabels: {
      color: '#FFFF',
    },
  },
};

export const polarChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
      },
    },
    datalabels: {
      color: '#FFFF',
    },
  },
};

export const labels: readonly string[] = ['Precio Minimo'];

export const lineChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: true,
    },
  },
  elements: {
    line: {
      tension: 0.5,
    },
  },

  plugins: {
    tooltip: tooltipFormat,
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        padding: 20,
      },
    },
    datalabels: {
      color: '#FFFF',
    },
  },
};
