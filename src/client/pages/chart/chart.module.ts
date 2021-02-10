import {NgModule} from '@angular/core';

import {ChartPageComponent} from './chart.page';
import {SearchModule} from 'components';

@NgModule({
  imports: [
    SearchModule
  ],
  declarations: [ChartPageComponent]
})
export class ChartModule {
}
