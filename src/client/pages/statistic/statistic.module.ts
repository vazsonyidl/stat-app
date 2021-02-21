import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SearchModule, VisualizationModule} from 'components';
import {StatisticPageComponent} from './statistic.page';

import {statisticRouteConfig} from 'pages/statistic/statistic.routing';

@NgModule({
  declarations: [StatisticPageComponent],
  imports: [
    SearchModule,
    VisualizationModule,
    statisticRouteConfig
  ],
  exports: [RouterModule]
})
export class StatisticModule {
}
