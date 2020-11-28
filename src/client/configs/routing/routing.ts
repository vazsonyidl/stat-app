import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from '@angular/core';
import {MapComponent} from "../../pages/map/map.component";
import {NotFoundPageComponent} from "../../pages/not-found/not-found.page";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'map'},
  {path: 'map', component: MapComponent},
  {path: '404', component: NotFoundPageComponent},
  {path: '**', redirectTo: '404'}
];

export const rootConfig: ModuleWithProviders<any> = RouterModule.forRoot(routes);
