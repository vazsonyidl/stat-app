import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from '../components/app/app.component';
import {HeaderModule} from '../components/header/header.module';
import {MainPageModule} from '../pages/main/main.module';

import {rootConfig} from '../configs/routing/routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HeaderModule,
    MainPageModule,
    rootConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
