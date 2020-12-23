import {NgModule} from '@angular/core';

import {MainPageComponent} from './main.page';
import {MapModule} from '../../components/map/map.module';
import {SearchModule} from '../../components/search/search.module';
import {NotificationModule} from '../../components/notification/notification.module';
import {NotificationService} from '../../services/notification.service';
import {ApiService} from '../../services/api.service';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    MapModule,
    SearchModule,
    NotificationModule
  ],
  providers: [NotificationService, ApiService]
})
export class MainPageModule {
}
