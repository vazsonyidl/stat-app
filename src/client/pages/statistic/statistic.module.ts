import {NgModule} from '@angular/core';

import {SearchModule, VisualizationModule} from 'components';
import {StatisticPageComponent} from './statistic.page';

@NgModule({
  imports: [
    SearchModule,
    VisualizationModule
  ],
  declarations: [StatisticPageComponent]
})
export class StatisticModule {
}
