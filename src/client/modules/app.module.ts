import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { NgModule } from '@angular/core';

import { AppComponent } from '../components/app/app.component';
import {rootConfig} from "../configs/routing/routing";
import {ApiService} from "../services/api.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    rootConfig
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
