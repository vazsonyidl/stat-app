import {NgModule} from '@angular/core';

import {NotificationService} from 'services/notification.service';
import {NotificationComponent} from './notification.component';

@NgModule({
  declarations: [NotificationComponent],
  providers: [NotificationService],
  exports: [NotificationComponent],
})
export class NotificationModule {
}
