import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainPageComponent} from './main.page';
import {MapModule} from '../../components/map/map.module';
import {SearchModule} from '../../components/search/search.module';
import {NotificationModule} from '../../components/notification/notification.module';
import {ApiService} from '../../services/api.service';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MapModule,
    SearchModule,
    NotificationModule
  ],
  providers: [ApiService]
})
export class MainPageModule {
}
