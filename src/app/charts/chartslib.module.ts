import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ChartsRoutes } from './chartslib.routing';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ChartjsComponent } from './chart-js/chartjs.component';

import { NgxchartComponent } from './ngx-charts/ngx-chart.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ChartsRoutes),
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    ChartistModule,
   
    NgxChartsModule,
  ],
  providers: [],
  declarations: [ChartjsComponent, NgxchartComponent],
})
export class ChartslibModule {}
