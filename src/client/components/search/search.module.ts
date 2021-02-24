import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

import {OverlayService} from 'services/overlay.service';
import {SearchComponent} from './search.component';
import {SearchService} from './search.service';
import {OverlayModule} from '../overlay/overlay.module';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    OverlayModule,
    ReactiveFormsModule
  ],
  declarations: [SearchComponent],
  providers: [SearchService, OverlayService],
  exports: [SearchComponent]
})
export class SearchModule {
}
