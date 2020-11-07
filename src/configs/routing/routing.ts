import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from '@angular/core';

import {ScraperComponent} from "../../components/scraper/scraper.component";

const routes: Routes = [
  {path: 'scraper', component: ScraperComponent}
];

export const rootConfig: ModuleWithProviders<any> = RouterModule.forRoot(routes);
