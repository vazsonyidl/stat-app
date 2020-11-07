import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '../components/app/app.component';
import {ScraperModule} from "../components/scraper/scraper.module";
import {rootConfig} from "../configs/routing/routing";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ScraperModule,
    rootConfig
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
