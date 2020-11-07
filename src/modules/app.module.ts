import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '../components/app/app.component';
import {ScraperModule} from "../components/scraper/scraper.module";
import {rootConfig} from "../configs/routing/routing";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ScraperModule,
    rootConfig
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
