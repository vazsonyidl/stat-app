import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {NotFoundPageComponent} from 'pages/not-found/not-found.page';
import {MainPageComponent} from 'pages/main/main.page';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'main'},
  {
    path: 'chart',
    loadChildren: () => import('pages/statistic/statistic.module').then(m => m.StatisticModule)
  },
  {path: 'main', component: MainPageComponent},
  {path: '404', component: NotFoundPageComponent},
  {path: '**', redirectTo: '404'}
];

export const rootConfig: ModuleWithProviders<any> = RouterModule.forRoot(routes);
