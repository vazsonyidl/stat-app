import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

import {SearchComponent} from './search.component';
import {SearchService} from './search.service';


@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  declarations: [SearchComponent],
  providers: [SearchService],
  exports: [SearchComponent]
})
export class SearchModule { }
