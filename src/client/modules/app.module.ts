import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent, HeaderModule} from 'components';
import {MainPageModule} from 'pages/main/main.module';
import {StatisticModule} from 'pages/statistic/statistic.module';

import {rootConfig} from 'configs/routing/routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StatisticModule,
    HttpClientModule,
    HeaderModule,
    MainPageModule,
    rootConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
