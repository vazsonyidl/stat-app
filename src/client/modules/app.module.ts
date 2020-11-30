import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { NgModule } from '@angular/core';

import { AppComponent } from '../components/app/app.component';
import {HeaderModule} from "../components/header/header.module";
import {MainPageModule} from "../pages/main/main.module";

import {rootConfig} from "../configs/routing/routing";
import {ApiService} from "../services/api.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    rootConfig,
    HeaderModule,
    MainPageModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
