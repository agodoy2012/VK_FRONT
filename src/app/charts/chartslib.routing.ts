import { Routes } from '@angular/router';

import { ChartjsComponent } from './chart-js/chartjs.component';

import { NgxchartComponent } from './ngx-charts/ngx-chart.component';

export const ChartsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'chartjs',
        component: ChartjsComponent,
        data: {
          title: 'ChartJs',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'ChartJs' }],
        },
      },
      
      {
        path: 'ngxchart',
        component: NgxchartComponent,
        data: {
          title: 'Ngx Charts',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Ngx Charts' }],
        },
      },
    ],
  },
];
