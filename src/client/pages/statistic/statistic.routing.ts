import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {StatisticPageComponent} from './statistic.page';

const statisticRoutes: Routes = [
  {path: 'chart', component: StatisticPageComponent},
];

export const statisticRouteConfig: ModuleWithProviders<any> = RouterModule.forChild(statisticRoutes);
