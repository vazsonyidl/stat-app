import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScraperComponent} from "./scraper.component";
import {ApiService} from "../../services/api.service";

@NgModule({
  declarations: [ScraperComponent],
  imports: [
    CommonModule,
  ],
  providers: [ApiService]
})
export class ScraperModule { }
