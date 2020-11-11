import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { NgModule } from '@angular/core';

import { AppComponent } from '../components/app/app.component';
import {rootConfig} from "../configs/routing/routing";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    rootConfig
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
