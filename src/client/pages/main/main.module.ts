import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainPageComponent} from './main.page';
import {MapModule, SearchModule, NotificationModule} from 'components';
import {OverlayModule} from 'components/overlay/overlay.module';

import {ApiService} from 'services/api.service';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MapModule,
    SearchModule,
    NotificationModule,
    OverlayModule
  ],
  providers: [ApiService]
})
export class MainPageModule {
}
